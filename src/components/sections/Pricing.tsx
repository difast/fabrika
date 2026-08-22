"use client";

import { pricing } from "@/config/site";
import { computePrice, formatPrice } from "@/lib/pricing";
import { Icon } from "@/components/Icon";
import { Reveal, SectionHeading } from "@/components/ui";
import { useLead } from "@/components/lead/LeadContext";

export function Pricing() {
  const { open } = useLead();

  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-24 h-80 w-[600px] max-w-full -translate-x-1/2 rounded-full bg-violet/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Цены и абонементы"
            title={<>Выгодные тарифы со <span className="text-gradient">скидкой {pricing.discountPercent}%</span></>}
            subtitle="Чем больше занятий в абонементе — тем выгоднее стоимость одного урока. Оплата после выбора программы."
          />
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.plans.map((plan, i) => {
            const { oldPrice, newPrice, discountPercent } = computePrice(plan.basePrice, pricing.discountPercent);
            const perLesson = Math.round(newPrice / plan.lessons);
            const featured = plan.featured;

            return (
              <Reveal key={plan.id} delay={i * 90} className={featured ? "lg:-mt-4 lg:mb-4" : ""}>
                <article
                  className={`relative flex h-full flex-col rounded-3xl border p-7 transition duration-300 sm:p-8 ${
                    featured
                      ? "border-violet/60 bg-gradient-to-b from-violet/10 to-surface shadow-2xl shadow-violet/20"
                      : "border-border bg-surface/60 hover:border-violet/40"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet to-cyan px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                      {plan.badge}
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-extrabold">{plan.name}</h3>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg-soft font-display text-lg font-bold text-violet">
                      {plan.lessons}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-cyan">{plan.tagline}</p>
                  <p className="mt-3 text-sm text-muted">{plan.description}</p>

                  {/* Цена */}
                  <div className="mt-6 flex flex-wrap items-end gap-3">
                    <span className="font-display text-4xl font-extrabold">
                      {formatPrice(newPrice)} {pricing.currency}
                    </span>
                    <span className="mb-1 flex items-center gap-2">
                      <s className="text-lg text-muted/70">
                        {formatPrice(oldPrice)} {pricing.currency}
                      </s>
                      <span className="rounded-md bg-lime/15 px-2 py-0.5 text-sm font-bold text-lime">
                        −{discountPercent}%
                      </span>
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted">
                    ≈ {formatPrice(perLesson)} {pricing.currency} за занятие
                  </p>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                          <Icon name="check" size={13} strokeWidth={2.5} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => open({ tariff: `${plan.name} — ${plan.tagline}`, source: `pricing:${plan.id}` })}
                    className={`group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition ${
                      featured
                        ? "bg-gradient-to-r from-violet to-cyan text-white shadow-lg shadow-violet/30 hover:shadow-violet/50"
                        : "border border-border bg-bg-soft text-fg hover:border-violet/50 hover:text-violet"
                    }`}
                  >
                    Выбрать
                    <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-8 text-center text-sm text-muted">
            Не знаете, что выбрать?{" "}
            <button
              type="button"
              onClick={() => open({ source: "pricing-help" })}
              className="font-medium text-violet underline hover:text-cyan"
            >
              Получите бесплатную консультацию
            </button>{" "}
            — поможем подобрать оптимальный вариант.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
