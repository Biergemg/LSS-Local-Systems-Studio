'use client';

import { useId, useState } from 'react';
import { PPV, waLink } from '@/data/content';

type View = 'before' | 'after';

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export default function PpvDemo() {
  const uid = useId();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [service, setService] = useState('');
  const [view, setView] = useState<View>('after');

  const n = name.trim();
  const c = city.trim();
  const s = service.trim();
  const title = n || 'Tu negocio';
  const sub = [s, c].filter(Boolean).join(' · ') || 'Servicio · Ciudad';
  const where = c ? ` en ${c}` : '';

  const lenses =
    view === 'before'
      ? [
          { k: 'Lo que encuentra', v: 'Imagina un perfil de Instagram, una ficha de Google y una web que cuentan cosas distintas.' },
          { k: 'Lo que entiende', v: s ? `¿Hacen ${s}${where}? Hay que adivinarlo entre publicaciones.` : '¿Qué servicio ofrecen y dónde? Hay que adivinarlo entre publicaciones.' },
          { k: 'Cómo puede escribirte', v: 'No queda claro a qué número escribir ni qué decir.' },
        ]
      : [
          { k: 'Lo que encuentra', v: `Web, Google y WhatsApp con los mismos datos de ${n || 'tu negocio'}.` },
          { k: 'Lo que entiende', v: s ? `${cap(s)}${where}, cobertura y forma de trabajo en un solo lugar.` : 'El servicio, la cobertura y la forma de trabajo, en un solo lugar.' },
          { k: 'Cómo puede escribirte', v: 'Un botón abre WhatsApp con el servicio ya escrito.' },
        ];

  const message = `Hola, quiero revisar la primera impresión de mi negocio. Nombre: ${n || '___'} | Ciudad: ${c || '___'} | Servicio que quiero destacar: ${s || '___'} | Web o perfil de Google (si lo tengo): ___`;

  return (
    <div className="ppv">
      <form className="ppv-form" onSubmit={(e) => e.preventDefault()} aria-label={PPV.demoTitle}>
        <div>
          <h3 className="h3">{PPV.demoTitle}</h3>
          <p className="muted">{PPV.demoIntro}</p>
        </div>
        <div className="field">
          <label htmlFor={`${uid}-n`}>{PPV.fields.name.label}</label>
          <input id={`${uid}-n`} value={name} maxLength={60} autoComplete="off" placeholder={PPV.fields.name.placeholder} onChange={(e) => setName(e.target.value)} aria-describedby={`${uid}-hint`} />
          <p className="hint" id={`${uid}-hint`}>{PPV.fields.name.hint}</p>
        </div>
        <div className="field">
          <label htmlFor={`${uid}-c`}>{PPV.fields.city.label}</label>
          <input id={`${uid}-c`} value={city} maxLength={40} autoComplete="off" placeholder={PPV.fields.city.placeholder} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-s`}>{PPV.fields.service.label}</label>
          <input id={`${uid}-s`} value={service} maxLength={80} autoComplete="off" placeholder={PPV.fields.service.placeholder} onChange={(e) => setService(e.target.value)} />
        </div>
        <div role="group" aria-label="Comparar primera impresión" className="toggle">
          <button type="button" aria-pressed={view === 'before'} onClick={() => setView('before')}>{PPV.toggle.before}</button>
          <button type="button" aria-pressed={view === 'after'} onClick={() => setView('after')}>{PPV.toggle.after}</button>
        </div>
        <p className="notice">{PPV.notice}</p>
      </form>

      <div className="phone" role="group" aria-label="Vista conceptual de lo que ve un desconocido">
        <div className="phone-bar">
          <span>Vista conceptual</span>
          <span>{view === 'before' ? 'Antes' : 'Después'}</span>
        </div>
        <div className={`phone-screen ${view === 'before' ? 'state-bad' : ''}`}>
          <p className="phone-title">{title}</p>
          <p className="phone-sub">{sub}</p>
          <div style={{ marginTop: 12 }}>
            {lenses.map((l) => (
              <div className="lens-dark" key={l.k}>
                <p className="k">{l.k}</p>
                <p className="v">{l.v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="wa-box">
          {message}
          <p className="small">{PPV.waLead}</p>
        </div>
        <a className="btn btn-primary btn-block" style={{ marginTop: 14 }} href={waLink(message)} target="_blank" rel="noopener noreferrer">
          {PPV.cta}
        </a>
      </div>
    </div>
  );
}
