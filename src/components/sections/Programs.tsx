"use client";

import { programs } from "@/config/site";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal, SectionHeading } from "@/components/ui";
import { useLead } from "@/components/lead/LeadContext";

export function Programs() {
  const { open } = useLead();

  return (
    <section id="programs" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Программы обучения"
            title={<>Направления <span className="text-gradient">под интересы</span> ребёнка</>}
            subtitle="Выберите то, что зажигает вашего ребёнка — или доверьте выбор нам на бесплатной консультации."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 70}>
              <article className="group flex h-full flex-col rounded-3xl border border-border bg-surface/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-violet/50">
                <div className="flex items-center justify-between">
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-violet/20 to-cyan/20 p-3 text-violet">
                    <Icon name={p.icon as IconName} size={26} />
                  </div>
                  <span className="rounded-full border border-border bg-bg-soft px-3 py-1 text-xs font-medium text-muted">
                    {p.age}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.description}</p>
                <ul className="mt-4 space-y-2">
                  {p.learn.map((l) => (
                    <li key={l} className="flex items-center gap-2 text-sm text-fg/85">
                      <Icon name="check" size={14} className="text-lime" strokeWidth={2.5} />
                      {l}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => open({ program: p.title, source: `program:${p.title}` })}
                  className="group/btn mt-6 inline-flex items-center gap-2 self-start rounded-xl border border-border bg-bg-soft px-4 py-2.5 text-sm font-semibold transition hover:border-violet/50 hover:text-violet"
                >
                  Узнать подробнее
                  <Icon name="arrow" size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
