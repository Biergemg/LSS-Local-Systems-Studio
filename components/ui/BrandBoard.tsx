/* Lámina de identidad de LSS: tipografía, señal y paleta compuestas como pieza editorial de impresión.
   Es la propia identidad de LSS (no un negocio ficticio). Decorativa. */
export default function BrandBoard() {
  return (
    <figure className="board" aria-hidden="true">
      <i className="cm cm-tl" /><i className="cm cm-tr" /><i className="cm cm-bl" /><i className="cm cm-br" />
      <div className="sheet sheet-b" />
      <div className="sheet sheet-a">
        <div className="sheet-top"><span>LSS — Local Systems Studio</span><span>Sistema visual</span></div>
        <span className="gl gl-1"><em>ascendente</em></span>
        <span className="gl gl-2"><em>altura x</em></span>
        <span className="gl gl-3"><em>línea base</em></span>
        <p className="aa">Aa</p>
        <svg className="bm" viewBox="0 0 80 80" fill="none" focusable="false">
          <g stroke="#0b0b0b" strokeWidth="3" strokeLinecap="square">
            <polyline points="4,28 4,4 28,4" /><polyline points="52,4 76,4 76,28" />
            <polyline points="4,52 4,76 28,76" /><polyline points="52,76 76,76 76,52" />
          </g>
          <polyline className="bm-sig" points="4,40 60,40 60,62" stroke="#00cc6a" strokeWidth="4" strokeLinecap="square" />
        </svg>
        <p className="sheet-type"><b>Bricolage Grotesque</b> Bold<br /><b>Instrument Sans</b> Regular</p>
        <div className="sw">
          <span className="sw-k"><b>Negro</b>#0B0B0B</span>
          <span className="sw-s"><b>Señal</b>#00FF88</span>
          <span className="sw-p"><b>Papel</b>#F1F1EE</span>
        </div>
      </div>
    </figure>
  );
}
