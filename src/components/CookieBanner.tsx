"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";

const STORAGE_KEY = "techfabrika-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Показываем баннер, только если пользователь ещё не сделал выбор
    let decided = false;
    try {
      decided = localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      decided = false;
    }
    if (!decided) {
      // небольшая задержка, чтобы баннер плавно «выехал» после загрузки
      const t = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* приватный режим — просто скрываем */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[90] flex justify-center px-4 pb-4 sm:px-6 sm:pb-6"
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании файлов cookie"
    >
      <div className="glass w-full max-w-2xl rounded-3xl border border-violet/30 p-5 shadow-2xl shadow-violet/20 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-2xl" aria-hidden="true">
              🍪
            </span>
            <p className="text-sm text-fg/90">
              Привет! 👋 Мы используем файлы cookie, чтобы сайт работал быстро и был удобным именно
              для вас. Оставаясь здесь, вы соглашаетесь с этим — обещаем, ничего лишнего 😊 Подробнее
              в{" "}
              <a href="/privacy" target="_blank" className="font-medium text-violet underline hover:text-cyan">
                политике обработки данных
              </a>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={accept}
            className="group inline-flex shrink-0 items-center justify-center gap-2 self-stretch rounded-xl bg-gradient-to-r from-violet to-cyan px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition hover:shadow-violet/40 sm:self-auto"
          >
            Хорошо 🎉
            <Icon name="check" size={16} strokeWidth={2.5} className="transition-transform group-hover:scale-110" />
          </button>
        </div>
      </div>
    </div>
  );
}
