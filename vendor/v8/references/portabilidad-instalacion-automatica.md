# V8 — Instalación autónoma y portabilidad entre equipos (24-oct-2026)

## Contrato de ejecución: BOOTSTRAP OBLIGATORIO ANTES DE F1

Al recibir esta carpeta en Windows, macOS o Linux, el agente NO puede asumir que tiene skills, Node, Git, Python, navegador, MCP o herramientas de QA. Debe detectarlas, buscar la documentación vigente de sus autores, instalarlas cuando sea seguro y verificar su operación, **sin que el usuario tenga que escribir comandos**. V8 debe ser autocontenida en cuanto a instrucciones y su instalador, aunque los paquetes externos necesitan red y fuentes vigentes.

**Ejecución inicial:** leer `SKILL.md`, este documento y `scripts/bootstrap-v8.mjs`. Si hay Node.js >=18 y Git disponibles, ejecutar:

```shell
node scripts/bootstrap-v8.mjs --check --target auto
node scripts/bootstrap-v8.mjs --install --target auto
node scripts/bootstrap-v8.mjs --check --target auto
```

El programa se ejecuta desde la carpeta raíz de V8, independientemente del directorio actual. `--install` crea solo las carpetas faltantes del usuario, no borra/reescribe skills preexistentes; si el usuario solo usa Claude, elegir `--target claude`; para Codex `--target codex`. `--check` no descarga nada. El agente puede capturar stdout JSON y guardar su informe en el proyecto en ejecución (no dentro de otro proyecto).

### Preparación por sistema operativo

1. Detectar sistema operativo, usuario, agente activo, versión de Claude/Codex, Git, Node, npm/npx, Python 3 (necesario para ui-ux-pro-max), navegador Chromium/Chrome/Edge y acceso a red.
2. Si falta Node/Git/Python o versiones compatibles, obtener instalador y requisitos desde documentación oficial del proveedor, elegir gestor de paquetes o instalación **de usuario**. Instalar automáticamente cuando no requiera elevación ni acepte términos adicionales; si requiere administrador, políticas empresariales o interacción legal/autenticación, informar `PERMISSION_REQUIRED` y continuar con el siguiente componente sin ocultar el bloqueo.
3. Nunca usar `curl | bash`, scripts arbitrarios de terceros, repositorios espejo no verificados o ejecución de descargas sin inspección. Nunca sobrescribir instalaciones existentes no relacionadas ni alterar otros proyectos.
4. Al descargar componentes Git, conservar URLs de origen y SHA del commit; verificar nombre en `SKILL.md`, archivos referenciados, licencia y presencia de scripts ejecutables. Descartar fuentes suplantadas o que pidan secretos injustificados.
5. Recargar/reiniciar la aplicación de agente **solo después de que el usuario ya no tenga una sesión activa que deba preservarse**. Una sesión activa puede no descubrir las skills recién instaladas. Si no es posible reiniciar, anotar `RESTART_REQUIRED`, no afirmar uso real.

### Dependencias obligatorias de skill (instalar, no solo mencionar)

| Capacidad V8 | Skill | Procedencia oficial preferida | Fase |
|---|---|---|---|
| Redacción y propuesta de valor | `copywriting` | github.com/coreyhaines31/marketingskills | F2 |
| Arquitectura de conversión | `page-cro` o alias actual `cro` | github.com/coreyhaines31/marketingskills | F3 |
| Inteligencia UI/UX | `ui-ux-pro-max` | github.com/nextlevelbuilder/ui-ux-pro-max-skill | F4 |
| Auditoría SEO | `seo-audit` | github.com/coreyhaines31/marketingskills | F5 |
| Datos estructurados | `schema-markup` o alias actual `schema` | github.com/coreyhaines31/marketingskills | F5 |
| Crítica visual | `impeccable` | github.com/pbakaus/impeccable; `npx impeccable install --providers=claude --scope=global` o `codex` | F7 |

**Alias de versiones:** las últimas versiones de Marketing Skills consolidaron `page-cro` en `cro` y pueden utilizar `schema` en lugar de `schema-markup`. Aceptar alias solo si la skill tiene capacidad demostrada; documentar cuál se cargó, sin duplicar innecesariamente directorios.

**21st.dev:** es **dependencia de integración de descubrimiento UI** dentro de V8 moderno. Intentar configurar 21st MCP y sus skills de Explore, Build y Review usando fuentes oficiales:
- Claude Code: `claude plugin marketplace add 21st-dev/claude-code-plugin` y `claude plugin install 21st@21st --scope user` (adaptar sintaxis al CLI instalado; como alternativa, desde sesión `/plugin marketplace add 21st-dev/claude-code-plugin`, `/plugin install 21st@21st`).
- Codex: `codex plugin marketplace add 21st-dev/codex-plugin` y completar instalación con la interfaz oficial, o usar la guía MCP oficial.
- CLI alternativa: `npm i -g @21st-dev/cli`, `21st login`, `npx @21st-dev/cli install-skill`; **no se debe consumir créditos, generar con IA, publicar ni instalar componentes pagos sin aprobación**.
- Sitios oficiales: https://21st.dev/mcp y https://github.com/21st-dev/claude-code-plugin.
- El MCP puede instalarse sin autenticarse, pero las consultas útiles requieren API key o cuenta. Nunca pedir contraseña al agente ni guardar tokens en el skill. Si falta sesión/cuenta, registrar `AUTH_REQUIRED` y dejar el plugin configurado sin fingir conexión.
- El valor de 21st es biblioteca e inspiración auditada: no reemplaza dirección artística ni habilita copiar código sin licencia.

### Dependencias según proyecto (NO instalar indiscriminadamente)

- `Playwright`, `@axe-core/playwright`, `Lighthouse` y navegador de pruebas: instalar en devDependencies del **proyecto activo** si están justificados y son compatibles. Confirmar versión, `npx playwright --version`, disponibilidad del navegador, ejecución de prueba real y screenshots; descarga del navegador solo cuando lo necesite el proyecto.
- `Motion`, `GSAP`, `Three.js` / React Three Fiber: elegir por necesidades (CSS primero, motor principal único; WebGL solo con justificación y fallback). Instalar dependencias necesarias en **el proyecto activo**, no globalmente ni todas por defecto.
- Herramientas de desarrollo Node/npm, Python y Git: detectar, verificar rutas y versiones; no instalar dos gestores duplicados.
- Programas de pago, SaaS, generación con créditos, entornos de producción, despliegues y credenciales: nunca activar ni gastar de forma automática.

### Pruebas de cierre

Una mera carpeta llamada como la skill no acredita funcionalidad. Para cada skill confirmar `SKILL.md` legible, nombre/alias, recursos y scripts necesarios. Ejecutar tests o ayuda que no impliquen efectos externos cuando existan. Para 21st: distinguir `INSTALLED`, `AUTH_REQUIRED`, `CONNECTED` y `NOT_INSTALLED` basándose en verificación real del cliente MCP, no en la mera presencia en documentos.

Registrar tabla por componente: `origen`, `commit/version`, `estado inicial`, `acción`, `resultado`, `verificación`, `requiere reinicio`, `bloqueo`. Estados válidos: `PASS`, `MISSING`, `INSTALL_FAILED`, `AUTH_REQUIRED`, `PERMISSION_REQUIRED`, `RESTART_REQUIRED`, `BLOCKED`.

**Gate:** no declarar `V8_DEPENDENCIES_PASS` ni `G0 PASS` mientras quede un requisito obligatorio sin instalar/validar. Puede continuarse trabajo local con fallback si un servicio externo está bloqueado, pero se etiqueta `BLOCKED` y no se afirma que se aplicó una skill inexistente. Este gate no obliga a cancelar el desarrollo por un SaaS indisponible.

### Portabilidad y alcance

Copiar **toda** la carpeta `prompt-maestro-v8-orchestrator`, incluidas `references/`, `rules/`, `orchestration/`, `scripts/`, `templates/` y `manifest.yaml`. No requiere rutas locales absolutas del equipo original. El agente de la computadora destino ejecuta el bootstrap y adapta rutas usando su HOME y su propio sistema operativo. No copiar archivos de autenticación, API keys, .env, caches de proyectos ni dependencias ejecutables de la PC de origen. El instalador no busca ni modifica proyectos vecinos.

El contrato es realizar automáticamente **todos los pasos técnicamente posibles** con fuentes confiables y permisos existentes; no puede garantizar instalaciones donde falten red, derechos de ejecución, aceptación de términos o autenticación humana.
