"use client";

import { useEffect, useRef, useState } from "react";
import { contacts, site } from "@/config/site";
import { Icon } from "@/components/Icon";

const STORAGE_KEY = "techfabrika-channel-promo";
const COOKIE_KEY = "techfabrika-cookie-consent";

/** Не показываем промо, пока пользователь не закрыл баннер о cookie */
function cookieHandled() {
  try {
    return localStorage.getItem(COOKIE_KEY) !== null;
  } catch {
    return true;
  }
}

/** Тексты баннеров с просьбой подписаться на Telegram-канал.
 *  Показываются по очереди через паузу. Легко редактировать / добавлять. */
const messages = [
  {
    emoji: "🚀",
    title: "Мы есть в Telegram!",
    text: "Полезные материалы, идеи проектов и новости школы — подписывайтесь на наш канал 💜",
    cta: "Подписаться",
  },
  {
    emoji: "🎁",
    title: "Не пропустите бонусы!",
    text: "В нашем Telegram-канале — акции, советы для родителей и вдохновение для юных программистов 🤖",
    cta: "Хочу подписаться",
  },
];

/** Задержки перед показом каждого баннера (мс). Первый — через 30 сек, второй — через 90 сек. */
const delays = [30_000, 90_000];

export function ChannelPromo() {
  const [index, setIndex] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Планируем показ следующего баннера
  useEffect(() => {
    let step = 0;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "done") return; // пользователь подписался или закрыл все
      step = saved ? Number(saved) || 0 : 0;
    } catch {
      step = 0;
    }
    if (step >= messages.length) return;

    const show = () => {
      // если баннер о cookie ещё висит — подождём и попробуем снова
      if (!cookieHandled()) {
        timer.current = setTimeout(show, 4_000);
        return;
      }
      setIndex(step);
    };

    timer.current = setTimeout(show, delays[step] ?? 30_000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function persist(value: string) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* приватный режим — игнорируем */
    }
  }

  function close() {
    if (index === null) return;
    const next = index + 1;
    setIndex(null);
    if (next >= messages.length) {
      persist("done");
    } else {
      persist(String(next));
      timer.current = setTimeout(() => setIndex(next), delays[next] ?? 60_000);
    }
  }

  function subscribe() {
    persist("done");
    setIndex(null);
    window.open(contacts.telegramChannel, "_blank", "noopener,noreferrer");
  }

  if (index === null) return null;
  const m = messages[index];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[85] flex justify-start sm:left-6 sm:right-auto sm:bottom-6">
      <div className="glass relative w-full max-w-sm rounded-3xl border border-cyan/30 p-5 shadow-2xl shadow-cyan/20">
        <button
          type="button"
          onClick={close}
          aria-label="Закрыть"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition hover:bg-bg-soft hover:text-fg"
        >
          <Icon name="close" size={16} />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan/20 to-violet/20 text-2xl" aria-hidden="true">
            {m.emoji}
          </span>
          <div>
            <h3 className="font-display text-base font-bold">{m.title}</h3>
            <p className="mt-1 text-sm text-muted">{m.text}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={subscribe}
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-violet px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan/25 transition hover:shadow-cyan/40"
          >
            <Icon name="telegram" size={16} />
            {m.cta}
          </button>
          <button
            type="button"
            onClick={close}
            className="rounded-xl border border-border px-3 py-2.5 text-sm font-medium text-muted transition hover:text-fg"
          >
            Позже
          </button>
        </div>

        <span className="sr-only">Telegram-канал {site.name}</span>
      </div>
    </div>
  );
}
