"use client";

import { useEffect } from "react";
import { useLead } from "./LeadContext";
import { LeadForm } from "./LeadForm";
import { Icon } from "@/components/Icon";

export function LeadModal() {
  const { isOpen, preset, close } = useLead();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Форма заявки"
      onClick={close}
    >
      <div
        className="relative my-auto w-full max-w-lg rounded-3xl border border-border bg-surface p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Закрыть"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:bg-bg-soft hover:text-fg"
        >
          <Icon name="close" size={18} />
        </button>
        <LeadForm
          title="Бесплатная консультация"
          subtitle="Подберём программу под интересы и уровень вашего ребёнка."
          presetTariff={preset.tariff}
          presetProgram={preset.program}
        />
      </div>
    </div>
  );
}
