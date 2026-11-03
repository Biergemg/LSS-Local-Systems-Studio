/* El visor de LSS a gran escala: cuatro corchetes de encuadre, retícula de tercios y un cuadro de enfoque que se fija sobre
   el punto de interés. Es el símbolo de la marca como composición. Decorativo; sin animación con prefers-reduced-motion. */
export default function Viewfinder() {
  return (
    <svg className="vfx" viewBox="0 0 400 480" fill="none" aria-hidden="true" focusable="false">
      <g className="vfx-grid" stroke="#1d1d1d" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <path d="M133 12V468M267 12V468M12 160H388M12 320H388" vectorEffect="non-scaling-stroke" />
      </g>
      <g className="vfx-br" stroke="#6a6a6a" strokeWidth="2" strokeLinecap="square">
        <polyline points="12,76 12,12 76,12" vectorEffect="non-scaling-stroke" />
        <polyline points="324,12 388,12 388,76" vectorEffect="non-scaling-stroke" />
        <polyline points="12,404 12,468 76,468" vectorEffect="non-scaling-stroke" />
        <polyline points="324,468 388,468 388,404" vectorEffect="non-scaling-stroke" />
      </g>
      <polyline className="vfx-sig" points="12,240 200,240 200,320" stroke="#00ff88" strokeWidth="3" strokeLinecap="square" vectorEffect="non-scaling-stroke" />
      <rect className="vfx-focus" x="172" y="212" width="56" height="56" stroke="#00ff88" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      <rect className="vfx-dot" x="196" y="236" width="8" height="8" fill="#00ff88" />
    </svg>
  );
}
