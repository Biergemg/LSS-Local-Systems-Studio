'use client';
import { useState } from 'react';
import { FAQS } from '@/data/content';

export default function FaqAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section-pad" style={{ background: 'var(--surface-raised)', borderTop: '1px solid var(--border)', padding: '96px 0' }}>
      <div className="container faq-grid" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 48 }}>
        <div><p className="t-label" style={{ color: 'var(--accent)', marginBottom: 16 }}>FAQ</p><h2 className="t-display" style={{ fontSize: 'clamp(32px,5vw,var(--text-3xl))' }}>Preguntas<br />frecuentes</h2></div>
        <div style={{ borderTop: '1px solid var(--border)' }}>{FAQS.map((faq, i) => <div key={faq.question} style={{ borderBottom: '1px solid var(--border)' }}><button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} style={{ width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', gap: 24, textAlign: 'left' }}><span className="t-h3" style={{ fontSize: 'var(--text-base)' }}>{faq.question}</span><span style={{ color: 'var(--accent)' }}>{open === i ? '−' : '+'}</span></button>{open === i && <p className="t-body-sm" style={{ padding: '0 0 24px', maxWidth: 680 }}>{faq.answer}</p>}</div>)}</div>
      </div>
    </section>
  );
}
