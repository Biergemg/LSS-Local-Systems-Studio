# V8 — Cierre de consolidación del método (2026-10-30)

## ACTUALIZACIÓN CANÓNICA 2026-10-31 — PREVALECE SOBRE EL ESTADO HISTÓRICO INFERIOR

- CORREGIDO: el orquestador antes solo exigía 6 habilidades y AI SEO estaba instalada únicamente en la carpeta del sitio LSS. Ahora son **7/7 obligatorias** y las siete están vendorizadas en V8 con SHA256 y licencias (MIT para Marketing/UI; Apache-2.0 para Impeccable). No se admiten diferencias sin bloqueo.
- F5 **invoca** SEO Audit + AI SEO/AEO/GEO/voz + Schema con artefactos, ejecución fechada, cartera mínima de cinco preguntas comerciales mapeadas a código real, sondeos externos y línea base. `verify-delivery.mjs` rechaza la ausencia, SHA distinto, pruebas ficticias o contenido modificado.
- El validador pasó 13/13 pruebas de contrato, incluidas cinco de rechazo nuevas; este resultado comprueba **la barrera automatizada**, NO que un cliente ya haya ejecutado las siete skills.
- 21st.dev: el plugin de Claude aún indica autenticación pendiente, pero `scripts/21st-direct.mjs` confirmó conexión real al MCP oficial con 51 herramientas y búsquedas de catálogo; transporte de solo lectura, cero créditos usados, secreto local no incluido en archivos V8. El bootstrap distingue el transporte directo del plugin.
- Un proyecto LSS publicado antes de esta actualización **NO queda certificado retroactivamente**. Requiere su expediente F5 nuevo, todos los gates y pruebas de contenido propio para obtener V8 COMPLETO.

---


**Identidad única:** Prompt Maestro V8 / skill name `prompt-maestro-v8-orchestrator`, versión lógica 8.0.0. Las diferentes webs de clientes no implican diferentes motores; se personalizan mediante brief, branding, copy, arquitectura y evidencia. La instalación operativa se sincroniza desde la carpeta maestra con SHA256.

## Cambios permanentes
- Se identificaron ocho archivos divergentes entre original y Claude instalado; fuente elegida: la carpeta original actualizada más recientemente.
- Se creó `rules/execution-contract.md` y se enlazó desde `SKILL.md`, `orchestration/flow.md`, `rules/enforcement.md`, `rules/quality-gates-2026.md`, `orchestration/skill-routing.md`.
- El contrato exige evidencias G0–G9, fases 1–9, todas las skills, inventario de piezas, hash de código, rutas UI, estados y pruebas de componente, journey de conversión, 16 capturas (320/390/768/1440 x hero/firma/CTA/footer), comandos, licencias, defectos y autorización.
- Se creó `scripts/verify-delivery.mjs` con validación de archivos reales, Git y hash de UI; `scripts/test-v8.mjs` comprueba rechazos de evidencia incompleta; `templates/delivery-evidence.example.json` es una plantilla BLOQUEADA, no un informe real.
- Se crearon `scripts/verify-integrity.mjs` y `scripts/sync-v8.mjs` para evitar diferencias entre copias. El mismo SHA256 debe acompañar cada copia y ZIP; el `--sync` archiva la anterior FUERA del directorio de skills activas.
- F4/F6 obliga buscar/comparar soluciones 21st.dev cuando haya autenticación; componentes de terceros solo se integran si justifican calidad, licencia y verificabilidad; preferible original cuando no aportan valor.
- Se instalaron instrucciones de Impeccable desde upstream público (commit df3a4abe7d0840d5f60324812c432e00b66a4e75); no se configuraron hooks automáticos, ni se ejecutaron binarios de tercero.

## Resultados de control
- Auditoría estática: PASS (65 checks antes del sellado).
- Contrato: 8/8 pruebas aisladas PASS. Escenario positivo sintético, siete fallos intencionados correctamente BLOQUEADOS.
- **No equivale a QA de un sitio real**, que exige evidencia de su propio proyecto y un revisor independiente para alto aseguramiento.
- 21st MCP aparece instalado pero con `Needs authentication`. No afirmar que se utilizó ni que V8 puede operar el marketplace todavía.

## Estado publicable
- Se puede distribuir la skill unificada y exigir este gate a futuras ejecuciones.
- No se certificó ninguna web de cliente ni se publicó nada.
- V8 completo con 21st sigue condicionado a autenticar la conexión 21st y ejecutar una prueba real de proyecto.

## Ejecución
Desde la raíz canónica:
1. `node scripts/audit-v8.mjs`
2. `node scripts/test-v8.mjs`
3. `node scripts/verify-integrity.mjs --verify`
4. `node scripts/sync-v8.mjs --check --target claude`
5. Para cada cliente: `node scripts/verify-delivery.mjs --project <ruta> --evidence <ruta>/V8_DELIVERY_EVIDENCE.json --mode production`

El nombre V8 se mantiene; el fingerprint SHA256 identifica la revisión concreta. Nunca instalar un PDF o ZIP histórico como fuente operativa.
