"use client";

import { useEffect, useState } from "react";
import { contacts, nav, site } from "@/config/site";
import { Icon } from "@/components/Icon";
import { CtaButton } from "@/components/ui";
import { Logo } from "@/components/Logo";
import Link from "next/link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Верхняя панель связи */}
      <div className="hidden border-b border-border/60 bg-bg/80 backdrop-blur md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-sm">
          <a href={`tel:${contacts.phoneRaw}`} className="flex items-center gap-2 text-muted transition hover:text-fg">
            <Icon name="phone" size={16} className="text-violet" />
            {contacts.phoneDisplay}
          </a>
          <div className="flex items-center gap-2">
            <ContactBtn kind="phone" />
            <ContactBtn kind="telegram" />
            <ContactBtn kind="whatsapp" />
          </div>
        </div>
      </div>

      {/* Основная навигация */}
      <div
        className={`transition-colors duration-300 ${
          scrolled ? "border-b border-border bg-bg/90 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5">
          <Link href="/#home" className="flex items-center gap-2.5" aria-label={site.name}>
            <Logo />
            <span className="font-display text-lg font-bold tracking-tight">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-bg-soft hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex">
              <CtaButton className="!px-4 !py-2.5 text-sm" source="header">
                Бесплатная консультация
              </CtaButton>
            </span>
            <button
              type="button"
              aria-label="Открыть меню"
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-fg lg:hidden"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col gap-6 overflow-y-auto border-l border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Logo />
                <span className="font-display text-lg font-bold">{site.name}</span>
              </div>
              <button
                type="button"
                aria-label="Закрыть меню"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border"
              >
                <Icon name="close" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-fg transition hover:bg-bg-soft"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2">
                <ContactBtn kind="phone" wide />
                <ContactBtn kind="telegram" wide />
                <ContactBtn kind="whatsapp" wide />
              </div>
              <CtaButton className="w-full" source="mobile-menu">
                Записаться
              </CtaButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function ContactBtn({ kind, wide = false }: { kind: "phone" | "telegram" | "whatsapp"; wide?: boolean }) {
  const map = {
    phone: { href: `tel:${contacts.phoneRaw}`, label: "Позвонить", color: "hover:text-violet" },
    telegram: {
      href: contacts.telegram.startsWith("http") ? contacts.telegram : `https://t.me/${contacts.telegram.replace("@", "")}`,
      label: "Telegram",
      color: "hover:text-cyan",
    },
    whatsapp: { href: `https://wa.me/${contacts.whatsappRaw}`, label: "WhatsApp", color: "hover:text-lime" },
  }[kind];

  return (
    <a
      href={map.href}
      target={kind === "phone" ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={map.label}
      className={`flex items-center justify-center gap-2 rounded-lg border border-border bg-bg-soft/60 px-3 py-2 text-sm font-medium text-muted transition ${map.color} ${
        wide ? "flex-col text-xs" : ""
      }`}
    >
      <Icon name={kind} size={wide ? 20 : 16} />
      <span className={wide ? "" : "hidden xl:inline"}>{map.label}</span>
    </a>
  );
}
