# F3 — CRO aplicado por separado

Origen: V8 `vendor/locked-skills/cro` (alias page-cro), upstream coreyhaines31/marketingskills, versión 2.0.0.

Entrada: copy final, estructura de página y WhatsApp como única conversión primaria. Tráfico específico y tasas históricas no disponibles. Mapa: necesidad de primera impresión → hero → propuesta general; evaluación de alcance → índice → propuesta contextual; riesgo de compra → proceso/FAQ → CTA final; consulta complementaria → página de servicio → WhatsApp.

Hallazgo reproducido en producción: CTA del hero fuera de la primera pantalla en 320x568 y parcialmente cubierto en 360x640. La mera presencia DOM o el centro del botón no bastaban. Corrección: jerarquía móvil más compacta y reflujo, conservación de un botón completo y test de sus cuatro esquinas/centro. El consentimiento mantiene rechazo y permiso con igual peso. No se propone eliminarlo para aumentar conversiones.

Alternativas de CTA consideradas: «Solicitar una propuesta» (conservado), «Pedir propuesta por WhatsApp» y «Cuéntanos de tu negocio». Solo la primera se entrega; no se simula un A/B test. Claridad en cinco segundos permanece hipótesis, no resultado humano.

Archivos afectados: globals.css, TrackingConsent y pruebas. Retest: matriz responsive, desplazamiento, foco y texto ampliado. No se atribuyen ventas ni mensajes recibidos a un clic. Sin uplift medido.
