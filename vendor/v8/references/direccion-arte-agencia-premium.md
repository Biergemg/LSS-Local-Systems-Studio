# V8 — Estándar de agencia premium contemporánea
Un sitio premium **no** es una plantilla con gradiente, cards, texto bonito y efectos por sección. Debe tener autoría visual, contenido creíble, ritmo, una experiencia memorable y conversión real.

## Antes de código (F1 y F4)
1. Analizar 3 competidores reales y 2 referencias de excelencia: URLs, fecha, aprendizajes y diferencias originales. Nunca clonar.
2. Generar **dos territorios creativos contrastados** (no simplemente negro vs blanco). Por cada uno: concepto memorable, buyer insight, tipo de imágenes, tipografía, retícula, motion, interacción central, objeción que resuelve.
3. Elegir UNO y plasmar tres keyframes: **hero, experiencia distintiva y cierre**; para desktop 1440×900 y móvil 390×844. Archivos reales/capturas, no declarar aprobado si no existen.
4. Diseñar **una firma visual** (tratamiento editorial reconocible) y **una firma funcional**: interacción que DEMUESTRA oferta (configurador, antes/después, explorador de proyectos con filtros, simulador honesto, secuencia comparativa, valoración, calculadora, consulta guiada). Prohibido fingir IA viva, rankings, números o resultados.
5. Guion de movimiento: qué elemento se anima, para qué, cuándo, easing/duración, alternativa reducida, carga y coste; no motion solo para impresionar.

## Sistema de composición
- Hero con jerarquía impecable, propuesta concreta, CTA por encima del fold móvil, imagen auténtica/composición cuidada y mensaje comprensible en 5 segundos.
- Secciones editoriales no idénticas; alternar densidades, transiciones, narrativas y escalas. No 12 rectángulos apilados.
- Componente extraordinario: algo que **el usuario puede experimentar**, no un mar de motion. Motion de baja amplitud al servicio de comprensión.
- Imágenes/renderes coherentes, fuentes legales, no marcas ajenas accidentales ni caras reales sin permisos. No simular instalaciones o equipos como si fueran del cliente.
- Tipografía con carácter y control fino: máximo 2 familias, fluid responsive clamp, longitudes de línea, contraste y jerarquía. No monospace decorativo constante.
- Feedback real de interacción: hover/focus/pressed/loading/error/success, formularios que envían o están etiquetados demo.
- 320, 390, 768, 1024, 1440/1920: cada viewport con composición intencional, no simple apilamiento.
- Una versión estática elegante debe funcionar si no hay JavaScript, GPU potente o el usuario solicita reduced-motion.

## Progressive enhancement / presupuesto de movimiento
Nivel 0: CSS, View Transitions nativas cuando funcionen, reduce-motion.
Nivel 1: Motion para UI React, layout compartido, gestos y estados.
Nivel 2: GSAP/ScrollTrigger para narrativa guiada, secciones fijadas solo con alternativa accesible, buen INP.
Nivel 3: WebGL/3D solo si objeto/proceso interactivo aporta entendimiento; fallback poster y descarga diferida.
**No** Lenis, GSAP, Motion, React Three Fiber y shaders simultáneamente por moda. Selección motivada con medición. Foco y teclado siempre activos.

## Gates visuales
- El usuario entiende a quién sirve, qué resuelve y cómo actuar en 5 segundos.
- CTA visible en el primer viewport de móvil sin scroll obligatorio.
- Capturas navegables de desktop/móvil: hero, media página, firma interactiva, CTA final y formulario/overlay.
- Crítica independiente basada en esas imágenes detecta problemas: incoherencia de fotografía, desalineación, contraste, cropping, scroll, tipografía, densidad, pequeños bugs. Segunda pasada tras correcciones.
- Animación tiene reduced-motion correcto; touch targets, teclado y formularios operativos.
- Cada “wow” se justifica en una fricción comercial eliminada o una demostración de oferta.

**Entregable `ART_DIRECTION.md`** por proyecto: referencias, territorios A/B, dirección elegida, keyframes reales, firma, recursos/licencias, estrategia de motion, vista móvil y decisión sobre elementos descartados.
