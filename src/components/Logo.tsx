export function Logo({ size = 36 }: { size?: number }) {
  return (
    <span
      className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-violet to-cyan text-white shadow-lg shadow-violet/30"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 8-4 4 4 4" />
        <path d="m16 8 4 4-4 4" />
      </svg>
    </span>
  );
}
