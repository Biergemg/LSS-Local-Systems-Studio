/* Diagrama propio de LSS: la geometría del logotipo (corchetes de encuadre + línea de señal) con los tres
   puntos de la Primera Visita marcados sobre el recorrido. Líneas rectas a 90°, sin curvas ni degradados. */
export default function FlowMark() {
  return (
    <svg className="flow" viewBox="0 0 360 360" role="presentation" aria-hidden="true" focusable="false">
      <g className="flow-brackets" transform="scale(4.5)" fill="none" stroke="#fff" strokeWidth="1.1" strokeLinecap="square">
        <polyline points="4,28 4,4 28,4" />
        <polyline points="52,4 76,4 76,28" />
        <polyline points="4,52 4,76 28,76" />
        <polyline points="52,76 76,76 76,52" />
      </g>
      <polyline className="flow-signal" points="18,180 270,180 270,279" fill="none" stroke="#00ff88" strokeWidth="7" strokeLinecap="square" />

      <g className="pt p1"><rect x="10" y="172" width="16" height="16" /><rect className="tag" x="34" y="136" width="46" height="24" /><text x="57" y="153" textAnchor="middle">01</text></g>
      <g className="pt p2"><rect x="262" y="172" width="16" height="16" /><rect className="tag" x="204" y="136" width="46" height="24" /><text x="227" y="153" textAnchor="middle">02</text></g>
      <g className="pt p3"><rect x="262" y="271" width="16" height="16" /><rect className="tag" x="204" y="250" width="46" height="24" /><text x="227" y="267" textAnchor="middle">03</text></g>
    </svg>
  );
}
