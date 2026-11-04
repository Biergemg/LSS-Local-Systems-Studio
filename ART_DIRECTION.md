# LSS — conservación de la dirección editorial

Autoridad visual: `app/globals.css`, `app/layout.tsx` y las secciones actuales. La misión exige perfeccionar, no sustituir la identidad.

Negro #0b0b0b, blanco, papel #f1f1ee y verde #00ff88. Bricolage Grotesque en titulares, Instrument Sans en lectura y Space Mono solo en los índices existentes. Espaciados y tamaños responden a los breakpoints; 320px exige menor titular, texto de 16px y CTA de al menos 54px para no quedar detrás del consentimiento. No se incorporan imágenes de clientes, testimonios ni precios.

Firma visual conservada: titular tipográfico con lente verde, contraste de superficies, índice editorial y CTA final verde. Firma funcional: cada servicio es un enlace real con mensaje contextual de WhatsApp, además del CTA general. El menú, FAQ y preferencias son controles reales; no hay APIs o bandejas ficticias.

Motor: CSS y la interacción de puntero existente. Reduced-motion elimina las animaciones CSS; la lente también responde a cambios de preferencia durante la sesión. Se mantienen texto y acciones sin JavaScript, con enlaces de navegación de respaldo. No se añade Motion, GSAP ni WebGL.

Keyframes actuales: los tests capturan hero, índice (signature), CTA y footer a 320/390/768/1440; hay además otros siete viewports. Los archivos reales se conservan en el expediente de pruebas. Antes/después móvil está en la carpeta privada de auditoría, asociado a producción recibida y al candidato respectivamente; no se representa un mock como captura.

Referencia interna AI Dental Receptionist: se leyó su dirección artística para contrastar intención, estados y reducción de movimiento. Su simulación, calculadora, colores y oferta no pertenecen a LSS y no se trasladan. Sus afirmaciones de QA no se usan como evidencia de esta web.

21st: ver `docs/audit/21ST_EVALUATION.md`. Dos piezas evaluadas y no seleccionadas; conservar código propio no se presenta como una integración externa.
