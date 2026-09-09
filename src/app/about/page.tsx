import type { Metadata } from "next";
import Link from "next/link";
import {
  site,
  company,
  hero,
  advantages,
  process,
  programs,
  founder,
  projects,
} from "@/config/site";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal, SectionHeading, CtaButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "О школе",
  description: `О школе «${site.name}»: как устроено индивидуальное обучение программированию для детей, чему учим и кто основал школу. Основатель — ${founder.name}.`,
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    url: `${site.url}/about`,
    title: `О школе «${site.name}»`,
    description: `Индивидуальное обучение программированию для детей и школьников. Школа «${site.name}» основана ${founder.name === "Дмитрий Пятаков" ? "Дмитрием Пятаковым" : founder.name}.`,
  },
};

/** Личные профили основателя для блока «Основатель» */
const founderLinks = [
  { name: "instagram" as const, href: founder.social.instagram, label: `Instagram ${founder.social.instagramDisplay}`, color: "text-violet" },
  { name: "youtube" as const, href: founder.social.youtube, label: `YouTube ${founder.social.youtubeDisplay}`, color: "text-cyan" },
  { name: "telegram" as const, href: founder.social.telegram, label: `Telegram ${founder.social.telegramDisplay}`, color: "text-lime" },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet/15 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-[40rem] h-80 w-80 rounded-full bg-cyan/10 blur-[120px]" />

        {/* Шапка страницы */}
        <section className="relative pt-32 sm:pt-40">
          <div className="mx-auto max-w-5xl px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-fg"
            >
              <Icon name="arrow" size={16} className="rotate-180" />
              На главную
            </Link>

            <h1 className="mt-6 max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
              О школе <span className="text-gradient">«{site.name}»</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              {site.name} — {site.tagline.toLowerCase()}. Мы учим детей создавать технологии, а не
              просто пользоваться ими: каждый ученик занимается индивидуально с преподавателем и с
              первых занятий делает собственные игры, сайты и IT-проекты.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {hero.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 70}>
                  <div className="rounded-2xl border border-border bg-surface/60 p-5 text-center">
                    <div className="font-display text-2xl font-extrabold text-gradient sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-muted">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Что за школа */}
        <section className="relative py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <SectionHeading
                center={false}
                eyebrow="Наш подход"
                title={<>Обучение, построенное <span className="text-gradient">вокруг ребёнка</span></>}
                subtitle="Никаких потоковых групп и универсальных программ: занятие идёт один на один, а программа собирается под возраст, уровень и интересы конкретного ученика."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {advantages.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
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

        {/* Как проходит обучение */}
        <section className="relative pb-20 sm:pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <SectionHeading
                center={false}
                eyebrow="Как всё устроено"
                title={<>От заявки до <span className="text-gradient">готового проекта</span></>}
              />
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((step, i) => (
                <Reveal key={step.step} delay={i * 70}>
                  <div className="h-full rounded-3xl border border-border bg-surface/60 p-6">
                    <span className="font-display text-3xl font-extrabold text-gradient">{step.step}</span>
                    <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-10 rounded-3xl border border-border bg-surface/60 p-7">
                <h3 className="font-display text-xl font-bold">Чему учим</h3>
                <p className="mt-2 text-muted">
                  {programs.length} направлений для учеников {hero.badge.includes("7–17") ? "7–17 лет" : "разных возрастов"} —
                  от первых шагов в блочном коде до собственных IT-проектов.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {programs.map((program) => (
                    <li
                      key={program.title}
                      className="rounded-full border border-border bg-bg-soft px-3.5 py-1.5 text-sm text-muted"
                    >
                      {program.title}
                      <span className="ml-1.5 text-xs text-muted/70">{program.age}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#programs"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-violet transition hover:text-cyan"
                >
                  Смотреть программы обучения
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Основатель */}
        <section id="founder" className="relative pb-20 sm:pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <SectionHeading center={false} eyebrow="Основатель" title={<>Основатель «{site.name}»</>} />
            </Reveal>

            <Reveal>
              <div className="mt-10 rounded-3xl border border-border bg-surface/60 p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet/25 to-cyan/25 font-display text-2xl font-extrabold text-gradient">
                    ДП
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold">{founder.name}</p>
                    <p className="text-sm text-muted">
                      {founder.nameEn} · {founder.jobTitle}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-lg text-fg">
                  Школа «{site.name}» основана Дмитрием Пятаковым.
                </p>
                <p className="mt-3 max-w-2xl text-muted">{founder.description}</p>

                <div className="mt-7">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted">
                    Другие проекты
                  </h3>
                  <ul className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
                    {projects
                      .filter((project) => project.url !== site.url)
                      .map((project) => (
                        <li key={project.url}>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2.5 rounded-2xl border border-border bg-bg-soft/60 p-3.5 text-sm text-muted transition hover:border-violet/50 hover:text-fg"
                          >
                            <Icon name="globe" size={16} className="mt-0.5 shrink-0 text-violet" />
                            <span>
                              <span className="font-medium text-fg">{project.name}</span> — {project.tagline}
                              <span className="ml-1.5 text-xs text-muted/80">
                                {project.url.replace("https://", "")}
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {founderLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-border bg-bg-soft/60 px-3 py-2 text-sm text-muted transition hover:border-violet/50 hover:text-fg"
                    >
                      <Icon name={item.name} size={16} className={item.color} />
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Финальный призыв */}
        <section className="relative pb-24 sm:pb-32">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-9 text-center sm:p-12">
                <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-violet/15 blur-[90px]" />
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-cyan/15 blur-[90px]" />
                <h2 className="relative font-display text-2xl font-bold sm:text-3xl">
                  Готовы попробовать?
                </h2>
                <p className="relative mx-auto mt-3 max-w-xl text-muted">
                  Подберём программу под возраст и интересы ребёнка и начнём с первого
                  индивидуального занятия.
                </p>
                <div className="relative mt-7 flex justify-center">
                  <CtaButton source="Страница «О школе»">Записаться на занятие</CtaButton>
                </div>
                <p className="relative mt-6 text-xs text-muted">
                  {company.legalName} · ОГРН {company.ogrn}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
