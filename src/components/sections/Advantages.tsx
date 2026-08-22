import { advantages } from "@/config/site";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal, SectionHeading } from "@/components/ui";

export function Advantages() {
  return (
    <section id="learn" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Почему ТехФабрика"
            title={<>Обучение, которое <span className="text-gradient">даёт результат</span></>}
            subtitle="Мы построили процесс так, чтобы ребёнку было интересно, а родителям — спокойно за качество и результат."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-violet/50 hover:bg-surface">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet/10 blur-2xl opacity-0 transition group-hover:opacity-100" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet/20 to-cyan/20 text-violet">
                  <Icon name={item.icon as IconName} size={28} />
                </div>
                <h3 className="relative mt-5 font-display text-xl font-bold">{item.title}</h3>
                <p className="relative mt-2.5 text-muted">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
