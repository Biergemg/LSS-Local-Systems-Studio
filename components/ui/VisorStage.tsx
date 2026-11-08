'use client';

import { useEffect, useRef } from 'react';

/* Escenario fijo detrás de la portada: cartel CSS (visible desde el primer pintado), lienzo WebGL del Visor, degradados suaves de lectura y marcas de visor.
   El motor (Three.js autoalojado + engine.js) es una mejora progresiva: se pide hasta la primera interacción o 3,5 s después de la carga y solo si el navegador
   no pidió movimiento reducido ni ahorro de datos (las clases gl-able / gl las gestiona el guion de arranque del layout y este componente).
   Sin WebGL, con movimiento reducido o si el motor falla, la página muestra la secuencia estática con los carteles.
   Guardián de rendimiento: el Visor no puede bloquear la lectura, el teclado ni el contacto. Si el navegador dibuja WebGL por software (SwiftShader, llvmpipe…)
   o si, ya en marcha, la mediana de los fotogramas supera el umbral, el motor se apaga y queda la secuencia estática (misma ruta que «sin WebGL»).
   window.__lssForceGL = true (solo pruebas) omite ambas comprobaciones para poder verificar el motor en un entorno sin GPU. */

type Visor = { destroy: () => void };
type VisorCfg = {
  stage: HTMLElement; canvas: HTMLCanvasElement; tc: HTMLElement | null; fontMono: string; fontLoad: string[];
  onReady: () => void; onLost: () => void; onActive: (v: boolean) => void;
};
declare global { interface Window { LSSVisor?: { start: (cfg: VisorCfg) => Visor | null }; THREE?: unknown } }

const SOFTWARE_GL = /swiftshader|llvmpipe|softpipe|software|basic render/i;
const SLOW_GAP_MS = 125;      /* mediana > 125 ms por fotograma (< 8 fps) sostenida = dispositivo demasiado lento para el Visor */
const FAST_BAIL_GAP_MS = 250; /* con ≥ 6 muestras, mediana > 250 ms = salida inmediata */
const SAMPLES = 24;

function softwareRenderer(): boolean {
  try {
    const c = document.createElement('canvas');
    const gl = (c.getContext('webgl') || c.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return false;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const name = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return SOFTWARE_GL.test(name);
  } catch { return false; }
}

function median(a: number[]): number { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; }

/* Mide los intervalos entre fotogramas mientras el escenario está activo y a la vista; llama a slow() si el dispositivo no sostiene el Visor. */
function watchFrames(stage: HTMLElement, slow: () => void): () => void {
  let raf = 0; let last = 0; let stopped = false; const gaps: number[] = []; const t0 = performance.now();
  const tick = (t: number) => {
    if (stopped) return;
    if (last && t - t0 > 1500 && stage.dataset.active !== '0' && !document.hidden) {
      const g = t - last;
      if (g < 1500) gaps.push(g);
      if (gaps.length >= 6 && median(gaps) > FAST_BAIL_GAP_MS) { stopped = true; slow(); return; }
      if (gaps.length >= SAMPLES) { stopped = true; if (median(gaps) > SLOW_GAP_MS) slow(); return; }
    }
    last = t; raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => { stopped = true; cancelAnimationFrame(raf); };
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.async = false; s.onload = () => resolve(); s.onerror = () => reject(new Error('No se pudo cargar ' + src));
    document.head.appendChild(s);
  });
}

export default function VisorStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('gl-able')) return;
    let started = false; let dead = false; let api: Visor | null = null; let timer = 0; let stopWatch: () => void = () => {};
    const force = (window as unknown as { __lssForceGL?: boolean }).__lssForceGL === true;
    const events = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const;

    const fail = () => { root.classList.remove('gl-able', 'gl'); root.classList.add('gl-failed'); };
    const go = () => {
      if (started) return; started = true; clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, go));
      const stage = stageRef.current; const canvas = canvasRef.current;
      if (!stage || !canvas) return;
      if (!force && softwareRenderer()) { fail(); return; }
      const mono = getComputedStyle(root).getPropertyValue('--font-mono').trim() || '"IBM Plex Mono"';
      (window.THREE && window.LSSVisor ? Promise.resolve() : loadScript('/visor/three-bundle.js').then(() => loadScript('/visor/engine.js')))
        .then(() => {
          if (dead || !window.LSSVisor) return;
          api = window.LSSVisor.start({
            stage, canvas, tc: tcRef.current, fontMono: mono, fontLoad: ['500 30px ' + mono],
            onReady: () => {
              root.classList.add('gl');
              if (!force) stopWatch = watchFrames(stage, () => { api?.destroy(); api = null; fail(); });
            },
            onLost: fail,
            onActive: (v) => { stage.dataset.active = v ? '1' : '0'; },
          });
          if (!api) fail();
        })
        .catch(fail);
    };
    const arm = () => {
      events.forEach((e) => window.addEventListener(e, go, { passive: true, once: true }));
      timer = window.setTimeout(go, 3500);
    };
    if (document.readyState === 'complete') arm(); else window.addEventListener('load', arm, { once: true });
    return () => {
      dead = true; clearTimeout(timer); stopWatch();
      window.removeEventListener('load', arm);
      events.forEach((e) => window.removeEventListener(e, go));
      api?.destroy(); root.classList.remove('gl');
    };
  }, []);

  return (
    <div className="stage" ref={stageRef} aria-hidden="true" data-active="1">
      <div className="stage-poster" />
      <canvas className="stage-canvas" ref={canvasRef} />
      <div className="stage-shade" />
      <div className="vf a" /><div className="vf b" /><div className="vf c" /><div className="vf d" />
      <div className="tc"><i /><span ref={tcRef}>00:00:00:00</span></div>
    </div>
  );
}
