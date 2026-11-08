/* Cartel estático de una toma del Visor. Solo se muestra cuando no hay motor WebGL (movimiento reducido, sin WebGL, ahorro de datos o fallo del motor);
   es decorativo: el contenido real está en el texto de cada sección. */
export default function Fig({ k }: { k: 0 | 1 | 2 | 3 | 4 | 5 | 6 }) {
  return <div className={`fig fig-${k}`} aria-hidden="true" />;
}
