'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { PPV, waLink } from '@/data/content';
import Art, { seedOf } from '@/components/ui/BrandArt';

type View = 'before' | 'after';
type Dir = 'atelier' | 'noche' | 'pigmento';

/* Paletas de la demostración. Cada par texto/fondo supera 4.5:1. */
const THEMES: Record<Dir, Record<string, string>> = {
  atelier: { '--b-bg': '#f3f0e8', '--b-fg': '#141414', '--b-soft': '#e2dccb', '--b-acc': '#141414', '--b-on': '#f3f0e8', '--b-mute': '#4a4a45', '--b-hi': '#006b3c' },
  noche: { '--b-bg': '#0b0b0b', '--b-fg': '#f5f5f5', '--b-soft': '#1a1a1a', '--b-acc': '#00ff88', '--b-on': '#000000', '--b-mute': '#b4b4b4', '--b-hi': '#00ff88' },
  pigmento: { '--b-bg': '#f6e7da', '--b-fg': '#2b1710', '--b-soft': '#ecd0bb', '--b-acc': '#b5401d', '--b-on': '#fff8f0', '--b-mute': '#5b3b2e', '--b-hi': '#8f2f12' },
};

export default function PpvDemo() {
  const uid = useId();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [service, setService] = useState('');
  const [dir, setDir] = useState<Dir>('atelier');
  const [view, setView] = useState<View>('before');

  const n = name.trim();
  const c = city.trim();
  const s = service.trim();
  const sample = !n && !c && !s;
  const title = sample ? 'Casa Arroyo' : n || 'Tu negocio';
  const place = sample ? 'Tampico' : c || 'Tu ciudad';
  const offer = sample ? 'Carpintería a medida' : s || 'Tu servicio principal';
  const letter = title.charAt(0).toUpperCase();
  const stageRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  /* Al llegar a la demostración se transforma sola una vez, para que el contraste sea evidente. */
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !touched.current) {
        timer = setTimeout(() => { if (!touched.current) setView('after'); touched.current = true; }, 1100);
        io.disconnect();
      }
    }, { threshold: 0.55 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);
  const seed = useMemo(() => seedOf(`${n}${c}${s}`), [n, c, s]);

  const message = `Hola, quiero ver cómo se presentaría mi negocio. Nombre: ${n || '___'} | Ciudad: ${c || '___'} | Servicio que quiero destacar: ${s || '___'} | Dirección de arte que me gustó: ${PPV.directions.find((d) => d.id === dir)?.label} | Web o perfil de Google (si lo tengo): ___`;

  const after = view === 'after';

  return (
    <div className="ppv-wrap" data-view={view}>
      <form
        className="ppv-controls"
        onSubmit={(e) => {
          e.preventDefault();
          touched.current = true;
          setView(after ? 'before' : 'after');
        }}
        aria-label="Datos de tu negocio"
      >
        <div className="field">
          <label htmlFor={`${uid}-n`}>{PPV.fields.name.label}</label>
          <input id={`${uid}-n`} value={name} maxLength={40} autoComplete="off" placeholder={PPV.fields.name.placeholder} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-c`}>{PPV.fields.city.label}</label>
          <input id={`${uid}-c`} value={city} maxLength={30} autoComplete="off" placeholder={PPV.fields.city.placeholder} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-s`}>{PPV.fields.service.label}</label>
          <input id={`${uid}-s`} value={service} maxLength={50} autoComplete="off" placeholder={PPV.fields.service.placeholder} onChange={(e) => setService(e.target.value)} />
        </div>

        <fieldset className="dirs">
          <legend>Dirección de arte</legend>
          <div className="dir-row">
            {PPV.directions.map((d) => (
              <button key={d.id} type="button" className="dir" aria-pressed={dir === d.id} onClick={() => setDir(d.id as Dir)} data-dir={d.id}>
                <span className="dir-sw" aria-hidden="true" />
                <span className="dir-name">{d.label}</span>
                <span className="dir-hint">{d.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary btn-block ppv-go" aria-pressed={after}>
          {after ? PPV.actionBefore : PPV.actionAfter}
        </button>
      </form>

      <div className="ppv-canvas">
        <div className="canvas-bar">
          <span className="canvas-tag">{PPV.tag}</span>
          <div className="canvas-switch" role="group" aria-label="Estado de la presentación">
            <button type="button" aria-pressed={!after} onClick={() => { touched.current = true; setView('before'); }}>{PPV.toggle.before}</button>
            <button type="button" aria-pressed={after} onClick={() => { touched.current = true; setView('after'); }}>{PPV.toggle.after}</button>
          </div>
        </div>

        <div className="canvas" ref={stageRef} style={THEMES[dir] as React.CSSProperties} data-dir={dir} role="img" aria-label={after ? `Propuesta de presentación para ${title}, ${offer} en ${place}` : `Punto de partida de ${title}: información dispersa`}>
          {/* Antes */}
          <div className="layer layer-before" aria-hidden="true">
            <div className="scrap scrap-card">
              <b>{title}</b>
              <span>{offer} · {place}</span>
              <i /><i /><i className="short" />
            </div>
            <div className="scrap scrap-post">
              <div className="post-img" />
              <span>{offer}</span>
            </div>
            <div className="scrap scrap-chat">
              <p>Hola, ¿qué servicios hacen?</p>
              <p className="me">¿Dónde trabajan?</p>
              <p>¿A qué número les escribo?</p>
            </div>
            <div className="scrap scrap-link">www.{title.toLowerCase().replace(/[^a-z0-9]/g, '') || 'tunegocio'}.com/?</div>
          </div>

          {/* Después */}
          <div className="layer layer-after" aria-hidden="true">
            <div className="site">
              <header className="site-nav" style={{ ['--i' as string]: 0 }}>
                <span className="mono">{letter}</span>
                <span className="site-brand">{title}</span>
                <span className="site-links"><i /><i /><i /></span>
                <span className="site-btn sm">Contacto</span>
              </header>
              <section className="site-cover">
                <div className="cover-text">
                  <p className="kicker" style={{ ['--i' as string]: 1 }}>{place}</p>
                  <h3 className="cover-title" style={{ ['--i' as string]: 2 }}>{title}</h3>
                  <p className="cover-sub" style={{ ['--i' as string]: 3 }}>{offer}</p>
                  <span className="site-btn" style={{ ['--i' as string]: 4 }}>Pedir cotización →</span>
                </div>
                <div className="cover-art" style={{ ['--i' as string]: 2 }}>
                  <Art seed={seed} letter={letter} />
                </div>
              </section>
              <section className="site-cards">
                <div className="card" style={{ ['--i' as string]: 5 }}><b>01</b><span>{offer}</span></div>
                <div className="card" style={{ ['--i' as string]: 6 }}><b>02</b><span>Cobertura en {place}</span></div>
                <div className="card" style={{ ['--i' as string]: 7 }}><b>03</b><span>Contacto directo</span></div>
              </section>
              <section className="site-slots">
                <div className="slot" style={{ ['--i' as string]: 8 }}>{PPV.slots.photo}</div>
                <div className="slot" style={{ ['--i' as string]: 9 }}>{PPV.slots.proof}</div>
                <div className="slot" style={{ ['--i' as string]: 10 }}>{PPV.slots.review}</div>
              </section>
              <footer className="site-contact" style={{ ['--i' as string]: 11 }}>
                <span>Escríbenos por WhatsApp</span>
                <span className="site-btn sm">Abrir chat</span>
              </footer>
            </div>
          </div>
        </div>

        <p className="canvas-caption">{sample ? PPV.sampleCaption : PPV.caption}</p>
        <div className="canvas-cta" data-hide-wa>
          <a className="btn btn-primary" href={waLink(message)} target="_blank" rel="noopener noreferrer">{PPV.cta}</a>
          <p className="small">{PPV.waLead}</p>
        </div>
      </div>
    </div>
  );
}
