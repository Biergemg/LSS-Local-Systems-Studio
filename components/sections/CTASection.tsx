import { CTA_SECTION, CONTACT, EMAIL_CONTACT_URL, FAQ_ITEMS } from '@/data/content';
import Corners from '@/components/ui/Corners';
import Mark from '@/components/ui/Mark';

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
        <Mark />
        <div className="container finale-frame">
          <Corners />
          <p className="eyebrow">{CTA_SECTION.eyebrow}</p>
          <h2 id="cta-h" className="mega">{CTA_SECTION.title}</h2>
          <p className="lede">{CTA_SECTION.description}</p>
          <p className="cta-row" data-hide-wa>
            <a className="btn btn-primary btn-lg" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{CTA_SECTION.submit}</a>
          </p>
          <p className="small" style={{ maxWidth: '60ch' }}>{CTA_SECTION.micro}</p>
          <p className="small mail-line">Si prefieres no usar WhatsApp, <a href={EMAIL_CONTACT_URL}>solicita tu revisión por correo</a>. También puedes escribir a <a href={`mailto:${CONTACT.email}`} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>{CONTACT.email}</a>.</p>
        </div>
      </section>
    </>
  );
}
