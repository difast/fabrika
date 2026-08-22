"use client";

import { useState } from "react";
import { faq } from "@/config/site";
import { Icon } from "@/components/Icon";
import { Reveal, SectionHeading } from "@/components/ui";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Вопросы и ответы"
            title={<>Отвечаем на <span className="text-gradient">частые вопросы</span></>}
            subtitle="Не нашли ответ? Задайте вопрос на бесплатной консультации."
          />
        </Reveal>

        <div className="mt-12 flex flex-col gap-3">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 40}>
                <div
                  className={`overflow-hidden rounded-2xl border transition ${
                    isOpen ? "border-violet/50 bg-surface" : "border-border bg-surface/50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-semibold sm:text-lg">{item.q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-violet transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-violet/10" : ""
                      }`}
                    >
                      <Icon name="plus" size={18} />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-muted">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
