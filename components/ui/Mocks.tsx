import type { ReactNode } from 'react';

/* Maquetas de producto dibujadas en código (sin imágenes de terceros ni datos reales).
   Son decorativas (aria-hidden) y siempre llevan una leyenda visible «Ejemplo ilustrativo»:
   no muestran clínicas, reseñas, calificaciones, gráficas ni cifras. */

export function Phone({ caption, children, className = '' }: { caption: string; children: ReactNode; className?: string }) {
  return (
    <figure className={`phone ${className}`}>
      <div className="phone-body" aria-hidden="true">
        <span className="phone-notch" />
        <div className="phone-screen">{children}</div>
      </div>
      <figcaption className="phone-cap">{caption}</figcaption>
    </figure>
  );
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Search() { return (<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" {...stroke}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>); }
function Pin() { return (<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.4" /></svg>); }
function Chat() { return (<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d="M4 5h16v11H9l-5 4V5Z" /></svg>); }
function Cal() { return (<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" {...stroke}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>); }
function Check() { return (<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>); }

/* Conversación de WhatsApp guiada (las burbujas aparecen en secuencia salvo con movimiento reducido). */
export function ChatMock() {
  return (
    <>
      <div className="m-head">
        <span className="m-av">TC</span>
        <span><span className="m-name">Tu clínica</span><span className="m-sub">en línea</span></span>
      </div>
      <div className="m-seq">
        <div className="m-bubble m-in" style={{ '--i': 0 } as React.CSSProperties}>Hola, me interesa agendar una evaluación.</div>
        <div className="m-bubble m-out" style={{ '--i': 1 } as React.CSSProperties}>¡Hola! Gracias por escribirnos. ¿Qué te gustaría hacer?</div>
        <div className="m-chips" style={{ '--i': 2 } as React.CSSProperties}>
          <span className="m-chip">Agendar mi cita</span>
          <span className="m-chip">Ver servicios</span>
          <span className="m-chip">Ubicación y horarios</span>
        </div>
        <div className="m-bubble m-in" style={{ '--i': 3 } as React.CSSProperties}>Agendar mi cita.</div>
        <div className="m-bubble m-out" style={{ '--i': 4 } as React.CSSProperties}>Perfecto. Elige el día y el horario que mejor te acomode.</div>
        <div className="m-card" style={{ '--i': 5 } as React.CSSProperties}>
          <Cal />
          <span><b>Primera cita</b><span className="m-sub">Jueves 16 · 10:00</span></span>
          <span className="m-ok">Confirmada</span>
        </div>
      </div>
      <div className="m-input"><span>Escribe un mensaje</span></div>
    </>
  );
}

/* Búsqueda local: la ficha del negocio con servicios, horarios y contacto claros, frente a resultados genéricos. */
export function GoogleMock() {
  return (
    <>
      <div className="m-search"><Search /><span>tu servicio cerca de mí</span></div>
      <div className="m-map"><span className="m-pin"><Pin /></span></div>
      <div className="m-res me">
        <span className="m-name">Tu clínica</span>
        <span className="m-sub">Abierto · horario visible</span>
        <div className="m-tags"><span className="m-tag">Servicios claros</span><span className="m-tag">WhatsApp</span><span className="m-tag">Sitio web</span></div>
      </div>
      <div className="m-res"><span className="m-line" /><span className="m-line s" /></div>
      <div className="m-res"><span className="m-line" /><span className="m-line s" /></div>
      <div className="m-res"><span className="m-line" /><span className="m-line s" /></div>
    </>
  );
}

/* Sitio móvil explicado en segundos. */
export function SiteMock() {
  return (
    <>
      <div className="m-site-top"><span className="m-sq" /><span className="m-name">Tu clínica</span></div>
      <p className="m-h">Tu servicio, explicado en segundos.</p>
      <p className="m-sub">Qué haces, para quién y cómo agendar, claro desde la primera pantalla.</p>
      <div className="m-row"><span>Servicio 1</span><span className="m-go">Agendar</span></div>
      <div className="m-row"><span>Servicio 2</span><span className="m-go">Agendar</span></div>
      <div className="m-row"><span>Servicio 3</span><span className="m-go">Agendar</span></div>
      <div className="m-cta"><Chat /> Escribir por WhatsApp</div>
    </>
  );
}

const DAYS = Array.from({ length: 35 }, (_, i) => (i < 2 || i > 31 ? null : i - 1));

/* Agenda conectada: elegir día y horario, con confirmación. */
export function AgendaMock() {
  return (
    <>
      <p className="m-title">Agendar cita</p>
      <div className="m-steps"><span className="m-step on">Día</span><span className="m-step on">Horario</span><span className="m-step">Confirmar</span></div>
      <div className="m-cal">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (<span key={i} className="dow">{d}</span>))}
        {DAYS.map((d, i) => (<span key={i} className={d === null ? 'off' : d < 13 ? 'off' : d === 16 ? 'sel' : ''}>{d ?? ''}</span>))}
      </div>
      <div className="m-slots">
        <span className="m-slot">09:00<span>Libre</span></span>
        <span className="m-slot on">10:00<b>Primera cita</b></span>
        <span className="m-slot">11:00<span>Libre</span></span>
      </div>
      <p className="m-note">Confirmación por correo al agendar.</p>
    </>
  );
}

/* Tarjeta de diagnóstico: tres hallazgos de ejemplo, en el mismo orden que la revisión real. */
export function DiagnosisMock() {
  const rows = [
    { icon: <Pin />, k: 'Te encuentran', v: 'Tu ficha de Google no explica tus servicios.' },
    { icon: <Search />, k: 'Te entienden', v: 'Tu sitio no dice en segundos a quién atiendes.' },
    { icon: <Cal />, k: 'Te escriben', v: 'Agendar requiere varios mensajes.' },
  ];
  return (
    <figure className="diag-fig">
      <div className="diag" aria-hidden="true">
        <p className="diag-h">Diagnóstico · 3 hallazgos</p>
        {rows.map((r) => (
          <div className="diag-row" key={r.k}>
            <span className="diag-ic">{r.icon}</span>
            <span><span className="diag-k">{r.k}</span><span className="diag-v">{r.v}</span></span>
          </div>
        ))}
        <p className="diag-foot"><Check /> Con un siguiente paso sugerido</p>
      </div>
      <figcaption className="phone-cap">Ejemplo ilustrativo de hallazgos de un diagnóstico.</figcaption>
    </figure>
  );
}
