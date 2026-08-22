import { process } from "@/config/site";
import { Reveal, SectionHeading } from "@/components/ui";

export function Process() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Как проходит обучение"
            title={<>Всего <span className="text-gradient">4 простых шага</span> до первого проекта</>}
            subtitle="Прозрачный процесс от заявки до готовых работ ребёнка."
          />
        </Reveal>

        <div className="relative mt-16">
          {/* Соединительная линия для десктопа */}
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, i) => (
              <Reveal key={item.step} delay={i * 90}>
                <div className="relative flex h-full flex-col rounded-3xl border border-border bg-surface/60 p-7">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet/30 bg-bg font-display text-2xl font-extrabold text-gradient">
                    {item.step}
                  </div>
                  <h3 className="font-display text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
