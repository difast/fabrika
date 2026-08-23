"use client";

import { useState, type FormEvent } from "react";
import { programOptions, pricing } from "@/config/site";
import { Icon } from "@/components/Icon";

type Props = {
  /** Предвыбранный тариф (например, при клике «Выбрать» в карточке цены) */
  presetTariff?: string;
  presetProgram?: string;
  /** Компактный режим для встраивания в hero/footer */
  variant?: "full" | "compact";
  /** Заголовок над формой */
  title?: string;
  subtitle?: string;
};

type Status = "idle" | "loading" | "success" | "error";

const tariffOptions = pricing.plans.map((p) => `${p.name} — ${p.tagline}`);

export function LeadForm({ presetTariff, presetProgram, variant = "full", title, subtitle }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [consentError, setConsentError] = useState(false);
  // Жёсткие условия: кнопка активна только при заполненных имени, телефоне и галочке
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);

  const phoneDigits = phone.replace(/\D/g, "");
  const canSubmit = name.trim().length >= 2 && phoneDigits.length >= 10 && agreed;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: скрытое поле с необычным именем, которое автозаполнение не трогает.
    // Если оно заполнено — это бот.
    if ((data.get("website_hp") as string)?.trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      contact: (data.get("contact") as string)?.trim(),
      childAge: (data.get("childAge") as string)?.trim(),
      program: (data.get("program") as string)?.trim(),
      tariff: (data.get("tariff") as string)?.trim() || presetTariff || "",
      comment: (data.get("comment") as string)?.trim(),
      consent: agreed,
      page: typeof window !== "undefined" ? window.location.href : "",
    };

    // Жёсткая валидация перед отправкой
    if (payload.name.length < 2) {
      setStatus("error");
      setErrorMsg("Пожалуйста, укажите имя.");
      return;
    }
    if (payload.phone.replace(/\D/g, "").length < 10) {
      setStatus("error");
      setErrorMsg("Пожалуйста, укажите корректный номер телефона (не менее 10 цифр).");
      return;
    }
    if (!payload.consent) {
      setStatus("error");
      setConsentError(true);
      setErrorMsg("Пожалуйста, отметьте галочку согласия на обработку персональных данных.");
      return;
    }
    setConsentError(false);

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        const base = json.error || "Не удалось отправить заявку";
        throw new Error(json.detail ? `${base}\n(${json.detail})` : base);
      }
      setStatus("success");
      form.reset();
      setName("");
      setPhone("");
      setAgreed(false);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : "Что-то пошло не так. Попробуйте позвонить нам напрямую.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-lime/30 bg-lime/5 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime/15 text-lime">
          <Icon name="check" size={34} />
        </div>
        <h3 className="font-display text-2xl font-bold">Заявка отправлена!</h3>
        <p className="max-w-sm text-muted">
          Спасибо! Мы свяжемся с вами в ближайшее время, чтобы подобрать программу обучения для
          вашего ребёнка.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-violet hover:text-cyan"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-border bg-bg-soft px-4 py-3 text-fg placeholder:text-muted/60 outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/30";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {(title || subtitle) && (
        <div className="mb-1">
          {title && <h3 className="font-display text-2xl font-bold">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-muted">Имя родителя *</span>
          <input
            name="name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-muted">Телефон *</span>
          <input
            name="phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className={inputCls}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-muted">Telegram / другой способ связи</span>
          <input name="contact" placeholder="@username (необязательно)" className={inputCls} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-muted">Возраст ребёнка</span>
          <input name="childAge" inputMode="numeric" placeholder="Например, 10" className={inputCls} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-muted">Интересующее направление</span>
          <select name="program" defaultValue={presetProgram ?? ""} className={inputCls}>
            <option value="">Не выбрано</option>
            {programOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-muted">Тариф</span>
          <select name="tariff" defaultValue={presetTariff ?? ""} className={inputCls}>
            <option value="">Не выбран</option>
            {tariffOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      {variant === "full" && (
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-muted">Комментарий</span>
          <textarea
            name="comment"
            rows={3}
            placeholder="Расскажите об интересах ребёнка (необязательно)"
            className={inputCls + " resize-none"}
          />
        </label>
      )}

      {/* Honeypot для защиты от спам-ботов — скрыт от людей.
          Имя поля намеренно необычное, чтобы автозаполнение браузера его не трогало. */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Не заполняйте это поле
          <input name="website_hp" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label
        className={`flex items-start gap-3 rounded-xl p-3 text-sm transition ${
          consentError ? "border border-pink/50 bg-pink/10 text-pink" : "text-muted"
        }`}
      >
        <input
          name="consent"
          type="checkbox"
          required
          checked={agreed}
          onChange={(e) => {
            setAgreed(e.target.checked);
            if (e.target.checked && consentError) {
              setConsentError(false);
              setStatus("idle");
              setErrorMsg("");
            }
          }}
          className="mt-1 h-4 w-4 accent-violet"
        />
        <span>
          Я даю{" "}
          <a href="/consent" target="_blank" className="text-violet underline hover:text-cyan">
            согласие на обработку персональных данных
          </a>{" "}
          и принимаю{" "}
          <a href="/privacy" target="_blank" className="text-violet underline hover:text-cyan">
            политику обработки персональных данных
          </a>
          .
        </span>
      </label>

      {status === "error" && (
        <p className="whitespace-pre-line rounded-xl border border-pink/40 bg-pink/10 px-4 py-3 text-sm text-pink">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !canSubmit}
        title={!canSubmit ? "Заполните имя, телефон и поставьте галочку согласия" : undefined}
        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet to-cyan px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet/25 transition hover:shadow-violet/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Отправляем…" : "Отправить заявку"}
        {status !== "loading" && (
          <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
        )}
      </button>
    </form>
  );
}
