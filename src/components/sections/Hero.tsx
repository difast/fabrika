"use client";

import { hero, site } from "@/config/site";
import { Icon } from "@/components/Icon";
import { CtaButton, Reveal } from "@/components/ui";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 md:pt-40">
      {/* Фоновые декоративные объекты */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet/25 blur-[120px] blob" />
      <div className="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full bg-cyan/20 blur-[120px] blob" style={{ animationDelay: "-6s" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
        {/* Левая колонка — текст */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-soft/70 px-4 py-2 text-sm font-medium text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              {hero.badge}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              {site.name} — <span className="text-gradient">учим детей создавать технологии</span>, а не просто пользоваться ими
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg text-muted">{hero.subtitle}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaButton source="hero-primary">{hero.primaryCta}</CtaButton>
              <CtaButton variant="secondary" source="hero-secondary">
                {hero.secondaryCta}
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {hero.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-sm text-fg/90">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                    <Icon name="check" size={13} strokeWidth={2.5} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Правая колонка — визуальная композиция */}
        <Reveal delay={200} className="relative">
          <CodeCard />
        </Reveal>
      </div>

      {/* Статистика */}
      <Reveal>
        <div className="relative mx-auto max-w-7xl px-6 pb-16">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur sm:grid-cols-4 sm:p-8">
            {hero.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-extrabold text-gradient sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function CodeCard() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      {/* Плавающие бейджи */}
      <div className="absolute -left-4 top-8 z-20 hidden rounded-2xl border border-border bg-surface/90 px-4 py-3 shadow-xl backdrop-blur float sm:block">
        <div className="flex items-center gap-2 text-sm">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan/15 text-cyan">
            <Icon name="gamepad" size={18} />
          </span>
          <div>
            <div className="font-semibold">Моя первая игра</div>
            <div className="text-xs text-muted">запущена ✨</div>
          </div>
        </div>
      </div>
      <div
        className="absolute -right-3 bottom-10 z-20 hidden rounded-2xl border border-border bg-surface/90 px-4 py-3 shadow-xl backdrop-blur float sm:block"
        style={{ animationDelay: "-3s" }}
      >
        <div className="flex items-center gap-2 text-sm">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime/15 text-lime">
            <Icon name="rocket" size={18} />
          </span>
          <div>
            <div className="font-semibold">Проект готов</div>
            <div className="text-xs text-muted">+120 XP</div>
          </div>
        </div>
      </div>

      {/* Окно с кодом */}
      <div className="glass glow-violet relative z-10 overflow-hidden rounded-3xl">
        <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-pink/80" />
          <span className="h-3 w-3 rounded-full bg-lime/80" />
          <span className="h-3 w-3 rounded-full bg-cyan/80" />
          <span className="ml-3 font-mono text-xs text-muted">game.py</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed no-scrollbar">
          <code>
            <span className="text-muted"># Моя первая игра</span>{"\n"}
            <span className="text-pink">class</span> <span className="text-cyan">Hero</span>:{"\n"}
            {"    "}<span className="text-pink">def</span> <span className="text-lime">__init__</span>(self):{"\n"}
            {"        "}self.score = <span className="text-cyan">0</span>{"\n"}
            {"        "}self.level = <span className="text-cyan">1</span>{"\n"}
            {"\n"}
            {"    "}<span className="text-pink">def</span> <span className="text-lime">jump</span>(self):{"\n"}
            {"        "}<span className="text-pink">return</span> <span className="text-lime">{'"🚀 Поехали!"'}</span>{"\n"}
            {"\n"}
            hero = <span className="text-cyan">Hero</span>()<br />
            <span className="text-pink">print</span>(hero.jump())
            <span className="caret text-violet">▊</span>
          </code>
        </pre>
        <div className="border-t border-border/60 bg-bg/40 px-5 py-3 font-mono text-xs">
          <span className="text-lime">▸ 🚀 Поехали!</span>
        </div>
      </div>
    </div>
  );
}
