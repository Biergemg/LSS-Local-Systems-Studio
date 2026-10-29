import { CTA_SECTION, CONTACT, FAQ_ITEMS } from '@/data/content';

export default function CTASection() {
  return (
    <>
      <section id="preguntas" className="section on-raised" aria-labelledby="faq-h">
        <div className="container faq-wrap">
          <div>
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 id="faq-h" className="h2">Lo que suelen preguntar antes de empezar.</h2>
          </div>
          <div className="faq">
            {FAQ_ITEMS.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p className="ans">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="section" aria-labelledby="cta-h">
        <div className="container">
          <div className="cta-card">
            <p className="eyebrow">{CTA_SECTION.eyebrow}</p>
            <h2 id="cta-h" className="h2" style={{ maxWidth: '22ch' }}>{CTA_SECTION.title}</h2>
            <p className="lede">{CTA_SECTION.description}</p>
            <ul className="cta-list">
              {CTA_SECTION.list.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <p style={{ marginTop: 28 }}>
              <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{CTA_SECTION.submit}</a>
            </p>
            <p className="small" style={{ marginTop: 16, maxWidth: '60ch' }}>{CTA_SECTION.micro}</p>
            <p className="small" style={{ marginTop: 8 }}>
              También puedes escribir a <a href={`mailto:${CONTACT.email}`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{CONTACT.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
