/* Diagrama propio de LSS: retícula de plano + la geometría del logotipo (corchetes de encuadre y línea de señal)
   con los tres puntos de la Primera Visita Digital sobre el recorrido, y una cota «A DISTANCIA».
   Se ensambla en ~3 s (una sola vez). Líneas rectas a 90°, sin curvas, glow ni degradados.
   Estado base = estado final: sin animación (prefers-reduced-motion) se ve completo. */
export default function FlowMark() {
  return (
    <svg className="flow" viewBox="0 0 360 392" role="presentation" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="flow-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="#242424" strokeWidth="1" />
        </pattern>
      </defs>
      <rect className="flow-grid" x="0" y="0" width="360" height="352" fill="url(#flow-grid)" />

      <g className="flow-brackets" transform="scale(4.5)" fill="none" stroke="#fff" strokeWidth="1.1" strokeLinecap="square">
        <polyline className="b b1" pathLength="100" points="4,28 4,4 28,4" />
        <polyline className="b b2" pathLength="100" points="52,4 76,4 76,28" />
        <polyline className="b b3" pathLength="100" points="4,52 4,76 28,76" />
        <polyline className="b b4" pathLength="100" points="52,76 76,76 76,52" />
      </g>

      <polyline className="flow-signal" pathLength="100" points="18,180 270,180 270,279" fill="none" stroke="#00ff88" strokeWidth="7" strokeLinecap="square" />

      <g className="pt p1"><rect className="node" x="10" y="172" width="16" height="16" /><g className="tg"><rect className="tag" x="34" y="136" width="46" height="24" /><text x="57" y="153" textAnchor="middle">01</text></g></g>
      <g className="pt p2"><rect className="node" x="262" y="172" width="16" height="16" /><g className="tg"><rect className="tag" x="204" y="136" width="46" height="24" /><text x="227" y="153" textAnchor="middle">02</text></g></g>
      <g className="pt p3"><rect className="node" x="262" y="271" width="16" height="16" /><g className="tg"><rect className="tag" x="204" y="250" width="46" height="24" /><text x="227" y="267" textAnchor="middle">03</text></g></g>

      <g className="dim" stroke="#8f8f8f" strokeWidth="1.5" fill="none">
        <path className="dl dl1" pathLength="100" d="M18 376H128" />
        <path className="dl dl2" pathLength="100" d="M232 376H342" />
        <path d="M18 368V384M342 368V384" />
        <text className="dt" x="180" y="380" textAnchor="middle" stroke="none">A DISTANCIA</text>
      </g>
    </svg>
  );
}
