/* El símbolo de LSS a escala monumental: cuatro corchetes de encuadre y la línea de señal verde (el flujo).
   Geometría idéntica al logotipo (viewBox 80×80). Decorativo. */
export default function Mark({ className = '' }: { className?: string }) {
  return (
    <svg className={`mark ${className}`} viewBox="0 0 80 80" fill="none" aria-hidden="true" focusable="false">
      <g className="mark-brackets" strokeWidth="1.6" strokeLinecap="square">
        <polyline points="4,28 4,4 28,4" />
        <polyline points="52,4 76,4 76,28" />
        <polyline points="4,52 4,76 28,76" />
        <polyline points="52,76 76,76 76,52" />
      </g>
      <polyline className="mark-signal" points="4,40 60,40 60,62" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}
