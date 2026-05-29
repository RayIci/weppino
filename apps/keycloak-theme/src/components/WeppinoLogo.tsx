// Inline SVG so it inherits the page's loaded Libre Baskerville font and
// adapts fills to light/dark via CSS custom properties.
export function WeppinoLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="110 60 260 90"
      aria-label="Weppino"
      role="img"
      className={className}
    >
      <text
        x="240"
        y="108"
        textAnchor="middle"
        fontFamily="'Libre Baskerville', Georgia, serif"
        fontWeight="400"
        fontSize="48"
        letterSpacing="3"
      >
        <tspan fill="var(--foreground)">Wep</tspan>
        <tspan fill="var(--primary)">pino</tspan>
      </text>
      <path d="M200 136 Q240 128 280 136" stroke="var(--primary)" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
