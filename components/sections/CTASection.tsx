import { CTA_SECTION, CONTACT, FAQ_ITEMS } from '@/data/content';

export default function CTASection() {
  return (
    <>
      <section id="preguntas" className="section on-paper faq-section" aria-labelledby="faq-h">
        <div className="container faq-wrap">
          <div>
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 id="faq-h" className="display">Lo que suelen preguntar antes de empezar.</h2>
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

      <section id="contacto" className="section finale" aria-labelledby="cta-h">
        <div className="finale-glow" aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">{CTA_SECTION.eyebrow}</p>
          <h2 id="cta-h" className="mega">{CTA_SECTION.title}</h2>
          <p className="lede">{CTA_SECTION.description}</p>
          <ul className="cta-list">
            {CTA_SECTION.list.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <p className="cta-row" data-hide-wa>
            <a className="btn btn-primary btn-lg" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{CTA_SECTION.submit}</a>
          </p>
          <p className="small" style={{ maxWidth: '60ch' }}>{CTA_SECTION.micro}</p>
          <p className="small mail-line">
            También puedes escribir a <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}
