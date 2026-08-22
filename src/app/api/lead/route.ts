import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Простейшая защита от флуда: не более N заявок с одного IP за окно времени */
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; ts: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count += 1;
  return rec.count > RATE_LIMIT;
}

type LeadPayload = {
  name?: string;
  phone?: string;
  contact?: string;
  childAge?: string;
  program?: string;
  tariff?: string;
  comment?: string;
  consent?: boolean;
  page?: string;
  company?: string; // honeypot
};

function esc(s: string) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function clean(s: unknown, max = 500) {
  return String(s ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Слишком много заявок. Попробуйте позже." },
      { status: 429 },
    );
  }

  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос." }, { status: 400 });
  }

  // Honeypot — тихо принимаем, но не отправляем (это бот)
  if (clean(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const contact = clean(body.contact, 120);
  const childAge = clean(body.childAge, 40);
  const program = clean(body.program, 120);
  const tariff = clean(body.tariff, 160);
  const comment = clean(body.comment, 1500);
  const page = clean(body.page, 300);

  // Валидация
  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Укажите имя." }, { status: 400 });
  }
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) {
    return NextResponse.json({ ok: false, error: "Укажите корректный номер телефона." }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json(
      { ok: false, error: "Требуется согласие на обработку персональных данных." },
      { status: 400 },
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("[lead] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы в окружении");
    return NextResponse.json(
      { ok: false, error: "Сервис временно недоступен. Пожалуйста, позвоните нам напрямую." },
      { status: 500 },
    );
  }

  const now = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

  const lines = [
    "🎓 <b>Новая заявка с сайта ТехФабрика</b>",
    "",
    `👤 <b>Имя:</b> ${esc(name)}`,
    `📞 <b>Телефон:</b> ${esc(phone)}`,
    contact ? `💬 <b>Telegram / связь:</b> ${esc(contact)}` : "",
    childAge ? `🧒 <b>Возраст ребёнка:</b> ${esc(childAge)}` : "",
    program ? `📚 <b>Направление:</b> ${esc(program)}` : "",
    tariff ? `💳 <b>Тариф:</b> ${esc(tariff)}` : "",
    comment ? `📝 <b>Комментарий:</b> ${esc(comment)}` : "",
    "",
    `🕒 <b>Дата и время:</b> ${esc(now)} (МСК)`,
    page ? `🔗 <b>Страница:</b> ${esc(page)}` : "",
  ].filter(Boolean);

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      // не даём запросу висеть слишком долго
      signal: AbortSignal.timeout(10_000),
    });

    if (!tgRes.ok) {
      const detail = await tgRes.text().catch(() => "");
      console.error("[lead] Ошибка Telegram API:", tgRes.status, detail);
      return NextResponse.json(
        { ok: false, error: "Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] Сбой при отправке в Telegram:", err);
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку. Проверьте соединение и попробуйте снова." },
      { status: 500 },
    );
  }
}
