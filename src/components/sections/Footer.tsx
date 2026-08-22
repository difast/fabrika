import { contacts, site } from "@/config/site";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/ui";
import { LeadForm } from "@/components/lead/LeadForm";

const tgHref = contacts.telegram.startsWith("http")
  ? contacts.telegram
  : `https://t.me/${contacts.telegram.replace("@", "")}`;

const footerNav = [
  { label: "Обучение", href: "/#learn" },
  { label: "Программы", href: "/#programs" },
  { label: "Цены", href: "/#pricing" },
  { label: "О школе", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Политика обработки данных", href: "/privacy" },
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

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row">
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
