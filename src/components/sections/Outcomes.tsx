import { outcomes } from "@/config/site";
import { Icon, type IconName } from "@/components/Icon";
import { CtaButton, Reveal, SectionHeading } from "@/components/ui";

export function Outcomes() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Чему научится ребёнок"
            title={<>Реальные навыки и <span className="text-gradient">готовые проекты</span></>}
            subtitle="Не абстрактная теория, а конкретные результаты, которые можно показать друзьям и добавить в портфолио."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <article className="group flex h-full items-start gap-4 rounded-3xl border border-border bg-surface/50 p-6 transition hover:border-cyan/40 hover:bg-surface">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan/20 to-lime/20 text-cyan transition group-hover:scale-110">
                  <Icon name={item.icon as IconName} size={24} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <CtaButton source="outcomes">Записаться на бесплатную консультацию</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
