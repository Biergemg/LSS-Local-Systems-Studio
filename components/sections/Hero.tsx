import { CONTACT, HERO } from '@/data/content';

const SCOPE_ITEMS = ["Diagnóstico 30'", '4 etapas', 'WhatsApp directo', 'Sin campañas'];

export default function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--surface-base)', paddingTop: 'var(--nav-h)', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px),linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '64px 64px', opacity: .18, pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%', paddingTop: 80, paddingBottom: 64 }}>
        <p className="t-label hero-eyebrow" style={{ color: 'var(--accent)', marginBottom: 32 }}>{HERO.eyebrow}</p>
        <h1 className="hero-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,8vw,var(--text-5xl))', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wider)', lineHeight: 1, color: 'var(--fg)', marginBottom: 40, whiteSpace: 'pre-line' }}>{HERO.headline}</h1>
        <p className="t-body" style={{ color: 'var(--fg2)', maxWidth: 560, marginBottom: 48 }}>{HERO.body}</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}>
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{HERO.ctaPrimary}</a>
          <a href="#sistema" className="btn btn-secondary">{HERO.ctaSecondary}</a>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0 }}>
          {SCOPE_ITEMS.map((item, i) => (
            <span key={item} className="t-label" style={{ color: 'var(--fg3)', paddingRight: 20, marginRight: 20, borderRight: i < SCOPE_ITEMS.length - 1 ? '1px solid var(--border)' : 'none' }}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
