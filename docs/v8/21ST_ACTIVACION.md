# 21st.dev: activación real (V9.3)

Base: `6a4472c`. Plan gratuito. Sin créditos de IA ni pago.

## Estado por etapa

| Etapa | Estado | Evidencia |
|---|---|---|
| Conexión | **PASS** | `tools/list` devolvió 40 herramientas; `get_usage`: plan free, 2 recuperaciones/día, IA apagada |
| Investigación | **PASS** | más de 20 búsquedas con `search` (hero, editorial, transiciones, oferta, microinteracción) y 1 con `get_inspiration`: `21st/busquedas-21st.json` |
| Vista previa | PASS | Imágenes de vista previa de 10 candidatos (gratuitas; no cuentan como recuperación) |
| Recuperación de código | **1 de 2 usadas** | `get_component` #37530 *Editorial service list*. Queda 1 sin gastar |
| Integración | **Parcial: patrón, no código** | Ver abajo |

## Candidatos comparados

| Candidato | Valor para LSS | Decisión |
|---|---|---|
| 37530 Editorial service list (filas numeradas, desplazamiento al pasar el cursor) | Alto: sustituye la rejilla de cajas asimétricas de «Qué recibes» por una lista editorial de línea fina | **Patrón adoptado** |
| 34934 / 15606 Underline link | Bajo: ya existe `.link-line` | Descartado |
| 19257 Text Reveal (Mask) / 18595 Vertical Cut Reveal | Medio: la idea de revelar por máscara | **Idea adoptada** en CSS puro; no se instala la librería |
| 33309 Services Stack (paneles pegajosos) | Su vista previa usa degradado azul, esquinas redondeadas y fichas tipo píldora | Descartado: contradice la identidad |
| 33903 Services List | Estructura numerada con «desde $» y píldoras | Descartado: lleva precios no aprobados y píldoras |
| 4051, 6587, 28280, 9724, 2755, 5729 (heros) | Degradados, vidrio, WebGL, avatares y logos de clientes | Descartados: no superan el hero propio (marco, diagrama, etiquetas) y exigen elementos ficticios |
| 26705 Worth Keeping CTA, 40234 Gradient Blinds CTA | Marquesina gigante y WebGL | Descartados: decorativos |

Resultado honesto para el hero: ningún candidato mejoró el hero actual, por eso no se tocó.

## Licencia y dependencias del componente recuperado
- La API no declara licencia del código del autor (`ibrandify`). Por eso **no se copió el código**; se tomó únicamente la disposición (índice, título grande, descripción a la derecha, línea fina) y el desplazamiento horizontal al pasar el cursor, que son ideas de composición.
- El componente exige `shadcn/ui`, tokens `bg-card`/`border-border`, esquinas redondeadas y sombra: incompatible con LSS (0 radios, 0 sombras). Dependencias añadidas al proyecto: **ninguna**.
- No se adoptó su acordeón: ocultaría las cuatro respuestas, que el lector debe ver sin pulsar.

## Qué cambió en la landing (CSS; `globals.css`)
1. **Qué recibes**: de cuatro cajas con anchos desiguales a una lista editorial de cuatro filas con línea fina: índice, pregunta en grande, respuesta a la derecha. Al pasar el cursor, el título se desplaza 10 px (solo escritorio; con movimiento reducido no se mueve).
2. **Botón principal**: una línea horizontal de 14 px que se alarga a 26 px al pasar el cursor o al enfocar con teclado. Es geometría recta y señala la acción. No aparece en el menú.
3. **Titulares de sección**: se revelan con una máscara que sube (recorte de línea) en vez de un simple desvanecimiento. Solo con soporte de `animation-timeline` y sin movimiento reducido; si no, el texto está visible.
Sin dependencias nuevas, sin JavaScript nuevo.

## Pruebas
| Prueba | Resultado |
|---|---|
| tsc, eslint, build | Limpios |
| `qa4.mjs` (69 pruebas: familias tipográficas, 0 sombras/radios, ≥13 px, axe WCAG 2.2 AA, reveals, movimiento reducido, 390 y 1440) | **69 PASS / 0 FAIL** |
| Interacción medida | Título +10 px al hover; línea del botón 14 → 26 px; 0 animaciones con movimiento reducido |
| Lighthouse móvil, mediana de 5 | rendimiento **96** (antes 93), LCP 2.69 s (antes 2.73 s), FCP 0.91 s, TBT 101 ms (antes 190), CLS 0 |

El LCP sigue sobre 2.5 s simulado, por la causa ya documentada (runtime de React/Next). La mejora de rendimiento viene de menos CSS por celda, no de 21st.

## Capturas
`screenshots/21st/oferta-escritorio.png` y `oferta-movil.png` (antes `6a4472c` / después). Un matiz: la captura de elemento muestra el menú fijo superpuesto y un hueco donde la tarjeta «Si tu web ya funciona» aún no se había revelado; la prueba de reveals confirma que llega a opacidad 1.

## Credencial
Fuera de Git, en `~/.lss-secrets/21st.key` (acceso restringido al usuario), leída por un script local. No hay claves en el repositorio ni en estos documentos (verificado con búsqueda del prefijo). La clave se pegó en el chat: conviene regenerarla al terminar.

## Valoración
Mejora **moderada y real** en la sección de oferta, el botón y los titulares; el hero y la identidad no cambian. 21st aportó dirección de composición, no componentes: es el resultado esperable para una identidad con 0 radios y 0 degradados. No se declara 21st como fuente de componentes integrados.
