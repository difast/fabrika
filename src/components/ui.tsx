"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLead } from "./lead/LeadContext";
import { Icon } from "./Icon";

/* Кнопка, открывающая модальное окно с формой заявки */
export function CtaButton({
  children,
  tariff,
  program,
  source,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  tariff?: string;
  program?: string;
  source?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const { open } = useLead();
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition group";
  const styles = {
    primary:
      "bg-gradient-to-r from-violet to-cyan text-white shadow-lg shadow-violet/25 hover:shadow-violet/45 hover:-translate-y-0.5",
    secondary: "glass text-fg hover:border-violet/50 hover:-translate-y-0.5",
    ghost: "text-fg hover:text-violet",
  }[variant];

  return (
    <button
      type="button"
      onClick={() => open({ tariff, program, source })}
      className={`${base} ${styles} ${className}`}
    >
      {children}
      <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
    </button>
  );
}

/* Обёртка с анимацией появления при прокрутке */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* Заголовок секции с надзаголовком */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-lg text-muted">{subtitle}</p>}
    </div>
  );
}
