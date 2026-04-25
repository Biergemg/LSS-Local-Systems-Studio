'use client';

import { useState } from 'react';
import { CTA_SECTION, CONTACT } from '@/data/content';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { FAQ_ITEMS } from '@/data/content';

export default function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', business: '', sector: '', email: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '14px 16px',
    backgroundColor: 'var(--surface-inset)',
    border: '1px solid var(--border)',
    color: 'var(--fg)',
    fontFamily: 'var(--font-primary)',
    fontSize: 'var(--text-base)',
    fontWeight: 400,
    outline: 'none',
    borderRadius: 0,
    transition: 'border-color 0.15s ease',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-primary)',
    fontSize: 'var(--text-xs)',
    fontWeight: 500,
    color: 'var(--fg2)',
    letterSpacing: 'var(--tracking-widest)',
    textTransform: 'uppercase',
    marginBottom: '8px',
  };

  return (
    <>
      <section
        id="contacto"
        style={{
          backgroundColor: 'var(--surface-raised)',
          borderTop: '1px solid var(--border)',
          padding: '96px 0',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-w)',
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          {/* Left: info */}
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
                <div
                  key={detail}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: 'var(--accent)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  <span className="t-body-sm" style={{ color: 'var(--fg2)' }}>
                    {detail}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="t-label"
                style={{ color: 'var(--accent)' }}
              >
                WhatsApp → {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="t-label"
                style={{ color: 'var(--fg2)' }}
              >
                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* Right: form or success */}
          <div>
            {submitted ? (
              <div
                style={{
                  border: '1px solid var(--border)',
                  padding: '48px 32px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    marginBottom: '16px',
                  }}
                >
                  RECIBIDO.
                </div>
                <p className="t-body" style={{ color: 'var(--fg2)' }}>
                  Revisaremos tu mensaje y te contactamos en menos de 24 horas para coordinar el diagnóstico.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label htmlFor="name" style={labelStyle}>Nombre</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="business" style={labelStyle}>Negocio</label>
                    <input
                      id="business"
                      type="text"
                      required
                      value={form.business}
                      onChange={(e) => setForm({ ...form, business: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                      placeholder="Nombre de tu negocio"
                    />
                  </div>
                  <div>
                    <label htmlFor="sector" style={labelStyle}>Sector</label>
                    <input
                      id="sector"
                      type="text"
                      required
                      value={form.sector}
                      onChange={(e) => setForm({ ...form, sector: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                      placeholder="Ej: clínica dental, despacho jurídico..."
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                      placeholder="tu@email.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '16px 32px',
                      backgroundColor: loading ? 'var(--fg3)' : 'var(--accent)',
                      color: '#000',
                      fontFamily: 'var(--font-primary)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      letterSpacing: 'var(--tracking-widest)',
                      textTransform: 'uppercase',
                      border: 'none',
                      borderRadius: 0,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.15s ease',
                      width: '100%',
                    }}
                  >
                    {loading ? 'ENVIANDO...' : 'AGENDAR DIAGNÓSTICO GRATUITO'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        style={{
          backgroundColor: 'var(--surface-base)',
          borderTop: '1px solid var(--border)',
          padding: '96px 0',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-w)',
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          <div>
            <p className="t-label" style={{ color: 'var(--accent)', marginBottom: '16px' }}>
              FAQ
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3vw, var(--text-xl))',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wider)',
                lineHeight: 1.2,
                color: 'var(--fg)',
              }}
            >
              PREGUNTAS FRECUENTES
            </h2>
          </div>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>

        <style>{`
          @media (max-width: 768px) {
            #faq .faq-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
