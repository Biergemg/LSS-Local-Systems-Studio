interface LogoProps {
  size?: number;
  showText?: boolean;
}

export default function Logo({ size = 32, showText = true }: LogoProps) {
  return (
    <a
      href="/"
      style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
      aria-label="LSS — Local Systems Studio"
    >
      <svg
        viewBox="0 0 80 80"
        width={size}
        height={size}
        fill="none"
        aria-hidden="true"
      >
        <polyline
          points="4,28 4,4 28,4"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="square"
        />
        <polyline
          points="52,4 76,4 76,28"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="square"
        />
        <polyline
          points="4,52 4,76 28,76"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="square"
        />
        <polyline
          points="52,76 76,76 76,52"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="square"
        />
        <line
          x1="4"
          y1="40"
          x2="60"
          y2="40"
          stroke="#00FF88"
          strokeWidth="6"
          strokeLinecap="square"
        />
        <line
          x1="60"
          y1="40"
          x2="60"
          y2="62"
          stroke="#00FF88"
          strokeWidth="6"
          strokeLinecap="square"
        />
      </svg>
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--fg)',
              letterSpacing: 'var(--tracking-wider)',
            }}
          >
            LSS
          </span>
          <span
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 300,
              color: 'var(--fg2)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}
          >
            LOCAL SYSTEMS STUDIO
          </span>
        </div>
      )}
    </a>
  );
}
