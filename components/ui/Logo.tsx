import Link from 'next/link';

/* Logotipo oficial de LSS: marca (cuatro esquinas de visor y trazo de señal con quiebre a 90°) + nombre completo en texto real
   (LSS, filete, LOCAL / SYSTEMS / STUDIO y subrayado verde). El SVG se recorta a la marca (viewBox 80×80 sin aire sobrante) y el
   tamaño lo fija el CSS (.lk) para que el nombre completo se lea en cualquier pantalla. */
export default function Logo({ showText = true }: { showText?: boolean }) {
  return (
    <Link href="/" className="lk">
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" focusable="false">
        <path d="M 4 28 L 4 4 L 28 4" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
        <path d="M 52 4 L 76 4 L 76 28" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
        <path d="M 4 52 L 4 76 L 28 76" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
        <path d="M 52 76 L 76 76 L 76 52" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
        <line x1="4" y1="40" x2="60" y2="40" stroke="#00FF88" strokeWidth="6" strokeLinecap="square" />
        <line x1="60" y1="40" x2="60" y2="62" stroke="#00FF88" strokeWidth="6" strokeLinecap="square" />
      </svg>
      {!showText && <small className="sr">LSS Local Systems Studio, inicio</small>}
      {showText && (
        <>
          <b>LSS</b>
          <i aria-hidden="true" />
          <span><em>Local</em> <em>Systems</em> <em>Studio</em></span>
          <small className="sr"> Inicio</small>
        </>
      )}
    </Link>
  );
}
