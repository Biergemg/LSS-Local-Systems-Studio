import { SHOWCASE as S } from '@/data/content';

/* Maquetas conceptuales de páginas por sector, hechas en HTML/CSS. Son ilustrativas: no representan clientes ni resultados de LSS. */
export default function PerceptionSection() {
  return (
    <section id="percepcion" className="section on-paper percep" aria-labelledby="per-h">
      <div className="container">
        <div className="head-2">
          <div>
            <p className="eyebrow">{S.eyebrow}</p>
            <h2 id="per-h" className="display reveal">{S.title}</h2>
          </div>
          <p className="lede reveal">{S.body}</p>
        </div>

        <figure className="concepts-fig" aria-label={S.caption}>
          <div className="concepts">
            {S.concepts.map((c) => (
              <div className={`concept reveal theme-${c.id}`} key={c.id}>
                <p className="concept-tag"><span>{c.sector}</span><span>{S.tag}</span></p>
                <div className="phone" aria-hidden="true">
                  <div className="phone-bar">
                    <span className="phone-brand">{c.brand}</span>
                    <span className="phone-menu"><i /><i /><i /></span>
                  </div>
                  <div className="phone-hero">
                    <p className="phone-h">{c.headline}</p>
                    <p className="phone-sub">{c.sub}</p>
                    <span className="phone-btn">{S.cta}</span>
                  </div>
                  <ul className="phone-list">
                    {c.items.map((i) => (<li key={i}>{i}</li>))}
                  </ul>
                  <div className="phone-foot"><span>{S.foot.split(' · ')[0]}</span><span>{S.foot.split(' · ')[1]}</span></div>
                </div>
              </div>
            ))}
          </div>
          <figcaption className="showcase-note">{S.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
