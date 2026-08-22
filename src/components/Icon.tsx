import type { SVGProps } from "react";

type IconName =
  | "target"
  | "code"
  | "sparkles"
  | "calendar"
  | "brain"
  | "shield"
  | "gamepad"
  | "terminal"
  | "globe"
  | "flow"
  | "chip"
  | "rocket"
  | "python"
  | "layers"
  | "phone"
  | "telegram"
  | "whatsapp"
  | "check"
  | "arrow"
  | "menu"
  | "close"
  | "plus";

const paths: Record<IconName, React.ReactNode> = {
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  code: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13 6-2 12" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.8 4.8L18.5 9l-4.7 1.2L12 15l-1.8-4.8L5.5 9l4.7-1.2z" />
      <path d="M18 15l.9 2.4L21 18l-2.1.6L18 21l-.9-2.4L15 18l2.1-.6z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
  brain: (
    <>
      <path d="M9.5 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 0V5a2 2 0 0 0-2-1z" />
      <path d="M14.5 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  gamepad: (
    <>
      <rect x="2" y="7" width="20" height="10" rx="5" />
      <path d="M7 11v2M6 12h2M15.5 11.5h.01M18 13.5h.01" />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="4" width="6" height="6" rx="1.5" />
      <rect x="15" y="14" width="6" height="6" rx="1.5" />
      <path d="M6 10v4a3 3 0 0 0 3 3h6" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 15c-1.5 1-2 4-2 4s3-.5 4-2c.7-1 .6-2.3-.2-3S6 14.3 5 15z" />
      <path d="M9 12c3-6 7-8 11-8 0 4-2 8-8 11l-3-3z" />
      <circle cx="14.5" cy="8.5" r="1.4" />
    </>
  ),
  python: (
    <>
      <path d="M12 3c-3 0-4 1.4-4 3v2h5v1H6c-1.7 0-3 1.3-3 4s1.3 4 3 4h2v-2.5c0-1.7 1.3-3 3-3h4c1.4 0 2.5-1.1 2.5-2.5V6c0-1.6-1-3-4-3z" />
      <circle cx="9.5" cy="6" r=".8" fill="currentColor" stroke="none" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5z" />
      <path d="m3 13 9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  phone: <path d="M5 4h3l2 5-2 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  telegram: <path d="M21 5 3 12l5 2 2 5 3-3 4 3 4-14z M8 14l9-6-6 7" />,
  whatsapp: (
    <>
      <path d="M4 20l1.5-4A8 8 0 1 1 9 19.5z" />
      <path d="M9 9c0 3 3 6 6 6 1 0 1.5-.5 1.5-1.2 0-.3-1.5-1.3-1.9-1.3-.6 0-.7.8-1.1.8-.6 0-2.3-1.7-2.3-2.3 0-.4.8-.5.8-1.1 0-.4-1-1.9-1.3-1.9C9.5 7.5 9 8 9 9z" />
    </>
  ),
  check: <path d="m5 12 5 5L20 7" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

export function Icon({
  name,
  size = 24,
  ...props
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export type { IconName };
