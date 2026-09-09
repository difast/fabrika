import { contacts, site, founder, projects } from "@/config/site";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/ui";
import { LeadForm } from "@/components/lead/LeadForm";

const tgHref = contacts.telegram.startsWith("http")
  ? contacts.telegram
  : `https://t.me/${contacts.telegram.replace("@", "")}`;

const founderSocial = [
  { name: "instagram" as const, href: founder.social.instagram, label: `Instagram ${founder.social.instagramDisplay}`, color: "text-violet" },
  { name: "youtube" as const, href: founder.social.youtube, label: `YouTube ${founder.social.youtubeDisplay}`, color: "text-cyan" },
  { name: "telegram" as const, href: founder.social.telegram, label: `Telegram ${founder.social.telegramDisplay}`, color: "text-lime" },
];

const footerNav = [
  { label: "Обучение", href: "/#learn" },
  { label: "Программы", href: "/#programs" },
  { label: "Цены", href: "/#pricing" },
  { label: "О школе", href: "/about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Политика обработки данных", href: "/privacy" },
  { label: "Согласие на обработку данных", href: "/consent" },
];

export function Footer() {
  return (
    <footer id="contacts" className="relative border-t border-border bg-bg-soft/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Левая часть */}
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-2.5">
                <Logo />
                <span className="font-display text-lg font-bold">{site.name}</span>
              </div>
              <p className="mt-4 max-w-xs text-sm text-muted">
                Онлайн-школа программирования для детей и школьников. Индивидуальные занятия,
                реальные проекты и современные технологии.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 text-sm">
                <a href={`tel:${contacts.phoneRaw}`} className="flex items-center gap-2.5 text-muted transition hover:text-fg">
                  <Icon name="phone" size={16} className="text-violet" />
                  {contacts.phoneDisplay}
                </a>
                <a href={tgHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-muted transition hover:text-fg">
                  <Icon name="telegram" size={16} className="text-cyan" />
                  {contacts.telegramDisplay}
                </a>
                <a href={contacts.telegramChannel} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-muted transition hover:text-fg">
                  <Icon name="telegram" size={16} className="text-violet" />
                  Telegram-канал {contacts.telegramChannelDisplay}
                </a>
                <a href={`https://wa.me/${contacts.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-muted transition hover:text-fg">
                  <Icon name="whatsapp" size={16} className="text-lime" />
                  {contacts.whatsappDisplay}
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-muted">Разделы</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-sm text-muted transition hover:text-fg">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Форма в футере */}
          <Reveal className="rounded-3xl border border-border bg-surface/60 p-6 sm:p-7">
            <LeadForm variant="compact" title="Быстрая заявка" subtitle="Оставьте контакты — перезвоним и всё расскажем." />
          </Reveal>
        </div>

        {/* Основатель и другие проекты */}
        <div className="mt-14 grid gap-10 border-t border-border pt-10 sm:grid-cols-2">
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-muted">Основатель</h4>
            <p className="mt-4 font-display text-lg font-bold text-fg">
              {founder.name} <span className="text-muted">({founder.nameEn})</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">{founder.description}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {founderSocial.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-3 py-2 text-sm text-muted transition hover:text-fg"
                >
                  <Icon name={item.name} size={16} className={item.color} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-muted">Проекты</h4>
            <ul className="mt-4 flex flex-col gap-3.5">
              {projects.map((project) => (
                <li key={project.url}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 text-sm text-muted transition hover:text-fg"
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
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row">
          <p>
            {site.legalName} · © {new Date().getFullYear()} {site.name}. Все права защищены.
          </p>
          <a href="/privacy" className="transition hover:text-fg">
            Политика обработки персональных данных
          </a>
        </div>
      </div>
    </footer>
  );
}
