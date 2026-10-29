import { CTA_SECTION, CONTACT, FAQ_ITEMS } from '@/data/content';
import FaqAccordion from '@/components/ui/FaqAccordion';

export default function CTASection() {
  return (
    <>
      <section
        id="contacto"
        className="section-pad"
        style={{
          backgroundColor: 'var(--surface-raised)',
          borderTop: '1px solid var(--border)',
          padding: '96px 0',
        }}
      >
        <div
          className="container cta-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          <div>
            <p className="t-label" style={{ color: 'var(--accent)', marginBottom: '16px' }}>
              {CTA_SECTION.eyebrow}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, var(--text-2xl))',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wider)',
                lineHeight: 1.2,
                color: 'var(--fg)',
                marginBottom: '24px',
                whiteSpace: 'pre-line',
              }}
            >
              {CTA_SECTION.title}
            </h2>
            <p className="t-body" style={{ color: 'var(--fg2)', marginBottom: '40px' }}>
              {CTA_SECTION.description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {CTA_SECTION.callDetails.map((detail) => (
                <div key={detail} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span aria-hidden="true" style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent)', flexShrink: 0 }} />
                  <span className="t-body-sm" style={{ color: 'var(--fg2)' }}>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ border: '1px solid var(--border)', padding: '40px 32px', background: 'var(--surface-base)' }}>
            <p className="t-label" style={{ color: 'var(--accent)', marginBottom: '24px' }}>PARA EMPEZAR</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.15, textTransform: 'uppercase', marginBottom: '24px' }}>
              TRES DATOS. TRES OBSERVACIONES.
            </h3>
            <p className="t-body" style={{ color: 'var(--fg2)', marginBottom: '28px' }}>
              En el mensaje de WhatsApp indica el nombre de tu negocio, la ciudad y el servicio que más te interesa mostrar. Con eso comienza la revisión.
            </p>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '18px 20px',
                textAlign: 'center',
                backgroundColor: 'var(--accent)',
                color: '#000',
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
              }}
            >
              {CTA_SECTION.submit}
            </a>
            <p className="t-body-sm" style={{ color: 'var(--fg2)', marginTop: '20px' }}>
              También puedes escribirnos a <a href={'mailto:' + CONTACT.email} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{CONTACT.email}</a>.
            </p>
            <p className="t-body-sm" style={{ color: 'var(--fg3)', marginTop: '12px' }}>
              El botón abre WhatsApp. La revisión es manual y se coordina por conversación, no mediante un formulario automatizado.
            </p>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="section-pad"
        style={{
          backgroundColor: 'var(--surface-base)',
          borderTop: '1px solid var(--border)',
          padding: '96px 0',
        }}
      >
        <div
          className="container faq-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          <div>
            <p className="t-label" style={{ color: 'var(--accent)', marginBottom: '16px' }}>LO ESENCIAL</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 3vw, var(--text-xl))',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-wider)',
              lineHeight: 1.2,
              color: 'var(--fg)',
            }}>PREGUNTAS QUE VALE LA PENA HACER</h2>
          </div>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
        <style>{"@media (max-width: 768px) { #contacto .cta-grid { grid-template-columns: 1fr !important; gap: 48px !important; } #faq .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }"}</style>
      </section>
    </>
  );
}
