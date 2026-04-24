'use client';

import { useMemo, useState } from 'react';
import { CONTACT, CTA_SECTION } from '@/data/content';

type FormState = {
  name: string;
  business: string;
  sector: string;
  challenge: string;
};

const initialForm: FormState = { name: '', business: '', sector: '', challenge: '' };

export default function CTASection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const whatsappHref = useMemo(() => {
    const message = [
      'Quiero agendar un diagnóstico con LSS.',
      form.name ? `Nombre: ${form.name}` : '',
      form.business ? `Negocio: ${form.business}` : '',
      form.sector ? `Sector: ${form.sector}` : '',
      form.challenge ? `Principal problema: ${form.challenge}` : '',
    ].filter(Boolean).join('\n');

    return `https://wa.me/528333263389?text=${encodeURIComponent(message)}`;
  }, [form]);

  return (
    <section id="contacto" className="section-pad" style={{ background: 'var(--surface-raised)', borderTop: '1px solid var(--border)', padding: '96px 0' }}>
      <div className="container cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start' }}>
        <div>
          <p className="t-label" style={{ color: 'var(--accent)', marginBottom: 16 }}>{CTA_SECTION.eyebrow}</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,var(--text-3xl))', fontWeight: 700, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--fg)', lineHeight: 1.05, marginBottom: 24, whiteSpace: 'pre-line' }}>{CTA_SECTION.title}</h2>
          <p className="t-body" style={{ color: 'var(--fg2)', marginBottom: 48 }}>{CTA_SECTION.body}</p>
          <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ marginBottom: 40 }}>Agendar por WhatsApp</a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, borderTop: '1px solid var(--border)', paddingTop: 40 }}>
            {CTA_SECTION.details.map(([key, value]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', gap: 24, fontFamily: 'var(--font-primary)', fontSize: 'var(--text-base)' }}>
                <span className="t-label" style={{ color: 'var(--fg3)' }}>{key}</span>
                <span style={{ color: 'var(--fg)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          {submitted ? (
            <div style={{ background: 'var(--surface-base)', border: '1px solid var(--accent)', padding: 40, textAlign: 'center' }}>
              <div className="t-label" style={{ color: 'var(--accent)', marginBottom: 16 }}>{CTA_SECTION.successEyebrow}</div>
              <div className="t-h3" style={{ marginBottom: 12 }}>{CTA_SECTION.successTitle}</div>
              <p className="t-body-sm">{CTA_SECTION.successBody}</p>
              <a className="btn btn-primary" style={{ marginTop: 24 }} href={whatsappHref} target="_blank" rel="noopener noreferrer">Continuar en WhatsApp</a>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
                window.open(whatsappHref, '_blank', 'noopener,noreferrer');
              }}
              style={{ display: 'grid', gap: 20 }}
            >
              {[
                ['name', 'Nombre', 'Tu nombre', 'text'],
                ['business', 'Negocio', 'Nombre de tu negocio', 'text'],
                ['sector', 'Sector', 'Ej. Salud, legal, construcción', 'text'],
              ].map(([name, label, placeholder, type]) => (
                <label key={name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span className="t-label" style={{ color: 'var(--fg2)' }}>{label}</span>
                  <input required name={name} type={type} placeholder={placeholder} value={form[name as keyof FormState]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} style={{ background: 'var(--surface-inset)', border: '1px solid var(--border)', color: 'var(--fg)', padding: '14px 16px', outline: 'none', width: '100%', minHeight: 48 }} />
                </label>
              ))}
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="t-label" style={{ color: 'var(--fg2)' }}>Principal fricción</span>
                <textarea required name="challenge" placeholder="Ej. Llegan contactos, pero pocos son clientes reales" value={form.challenge} onChange={(event) => setForm({ ...form, challenge: event.target.value })} rows={4} style={{ background: 'var(--surface-inset)', border: '1px solid var(--border)', color: 'var(--fg)', padding: '14px 16px', outline: 'none', width: '100%', resize: 'vertical' }} />
              </label>
              <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: 8 }}>{CTA_SECTION.submit}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
