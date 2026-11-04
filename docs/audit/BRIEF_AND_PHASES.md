# Auditoría V8 de LSS — alcance y fases

Fecha local: 3 de noviembre de 2026 (America/Mexico_City). La misión adjunta del propietario autoriza auditoría, correcciones locales, commits y preview; prohíbe liberar a producción sin autorización final. Se conserva la oferta y la dirección editorial existente.

## F1 — diagnóstico

LSS vende diseño y desarrollo web para negocios de servicios en México, a distancia. Buyer: titular que necesita presentar con claridad su trabajo y facilitar contacto. Conversión primaria única: solicitar propuesta por WhatsApp; después conversación, propuesta y contratación. El clic mide intención, nunca recepción ni venta. La confianza procede del proceso por escrito, cuentas del cliente y calidad observable del propio sitio. No hay clientes, reseñas ni cifras utilizables como prueba social en este alcance.

Matriz: urgencia media, sensibilidad al precio media (hipótesis, sin investigación cuantitativa), autoridad alta, cercanía media, teatralidad baja y complejidad media. Se mantiene texto comprensible, alcance por escrito, FAQ de objeciones y CTA único. Comprensión en cinco segundos es hipótesis editorial: no hubo panel humano cronometrado.

Infraestructura B: continuar Next.js App Router, React, TypeScript estricto y CSS/Tailwind existentes. Actualizar seguridad conserva la arquitectura. No reconstruir en otra plataforma ni añadir motores de animación.

Referencias consultadas de nuevo: [Geowiza](https://geowiza.com/quienes-somos/), [Cocktail Marketing](https://cocktailmarketing.com.mx/diseno-web/), [Webpositer](https://www.webpositer.com/); referencias de dirección editorial: [BASIC/DEPT](https://www.basicagency.com/) y [Pentagram](https://www.pentagram.com/). Observaciones: claridad de servicios, separación de proceso y decisión, jerarquía de texto. No copiar portfolios, métricas, logotipos, precios ni promesas de esas empresas. Lectura pública, no auditoría integral de competidores.

Dos territorios considerados: (A) conservar el editorial negro/verde de LSS, con tipografía como firma y el índice de servicios como selector directo de intención; (B) una organización documental clara sobre papel, con el mismo contenido. A permanece por identidad aprobada y menor riesgo de regresión. B es una alternativa de dirección, no un segundo sitio ni un portfolio conceptual.

## F2–F5 — revisión de capacidades

Las siete operaciones y sus límites están en `skills/`. La capacidad UI/UX se aplica desde la copia canónica vendorizada; la actualización global de su carpeta en Codex quedó bloqueada por el propio sincronizador. No se convierte ese fallo de instalación en PASS. F4 conserva la implementación propia tras evaluar dos alternativas 21st con licencia MIT, preview y uso de teclado. F5 repite lectura, hashes, HTTP, metadata, schema y mapa de consultas; los dos sondeos externos son observaciones negativas de buscadores, no apariciones en asistentes.

## F6–F9 — construcción y entrega

F6: build de producción ejecutable, typecheck, lint, pruebas de navegador, política de seguridad compatible y consentimiento por conjunto de proveedores. F7: pruebas automatizadas más revisión de otro agente; no atribuir independencia a la redacción del implementador. F8: todo cierre necesita retest. F9 y los gates afectados permanecen bloqueados mientras falten obligaciones o autorización; un informe no basta para declarar publicación aprobada.

El estado ejecutable, por commit, está en el expediente JSON generado. Los documentos de `docs/v8/` son históricos: sus PASS, screenshots, hashes y Lighthouse no acreditan este candidato. El contenido comercial conservado se vuelve a inspeccionar; las capturas y métricas se vuelven a producir. No se borra el histórico ni material de otros worktrees.
