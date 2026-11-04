'use client';

import { useEffect, useRef } from 'react';

/* Titular con «lente»: una capa invertida (negro sobre verde) recortada por un marco que reposa sobre «a la altura».
   Con puntero fino, el marco sigue al cursor con inercia (enfoque sobre el texto); con tacto o movimiento reducido permanece en reposo. */
export default function HeroTitle({ pre, em, post }: { pre: string; em: string; post: string }) {
  const h1 = useRef<HTMLHeadingElement>(null);
  const layer = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = h1.current; const top = layer.current;
    if (!root || !top) return;
    const section = root.closest('section') ?? root;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduce = motion.matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let raf = 0;
    let cur = { x: 0, y: 0, w: 0, h: 0 };
    let rest = { x: 0, y: 0, w: 0, h: 0 };
    let target = rest; let hover = false; let size = { w: 0, h: 0 };

    const measure = () => {
      const phrase = root.querySelector<HTMLElement>('[data-lens-home]');
      if (!phrase) return;
      const b = root.getBoundingClientRect(); const r = phrase.getBoundingClientRect();
      rest = { x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2, w: r.width, h: r.height };
      size = { w: Math.max(r.width * 0.9, 220), h: r.height };
      if (!hover) target = rest;
    };
    const paint = () => {
      const b = root.getBoundingClientRect();
      const l = cur.x - cur.w / 2; const t = cur.y - cur.h / 2;
      top.style.clipPath = `inset(${Math.max(0, t)}px ${Math.max(0, b.width - (l + cur.w))}px ${Math.max(0, b.height - (t + cur.h))}px ${Math.max(0, l)}px)`;
    };
    const tick = () => {
      const k = reduce ? 1 : 0.16;
      cur = { x: cur.x + (target.x - cur.x) * k, y: cur.y + (target.y - cur.y) * k, w: cur.w + (target.w - cur.w) * k, h: cur.h + (target.h - cur.h) * k };
      paint();
      const done = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) + Math.abs(target.w - cur.w) + Math.abs(target.h - cur.h) < 0.5;
      raf = done ? 0 : requestAnimationFrame(tick);
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(tick); };

    measure();
    cur = { x: rest.x, y: rest.y, w: 0, h: rest.h };
    const start = window.setTimeout(() => { target = rest; go(); }, reduce ? 0 : 350);

    const onMove = (e: PointerEvent) => {
      if (!fine || reduce) return;
      const b = root.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - b.left, size.w / 2), b.width - size.w / 2);
      const y = Math.min(Math.max(e.clientY - b.top, size.h / 2), b.height - size.h / 2);
      hover = true; target = { x, y, w: size.w, h: size.h }; go();
    };
    const onLeave = () => { hover = false; target = rest; go(); };
    const onMotion = () => {
      reduce = motion.matches;
      if (reduce) { cancelAnimationFrame(raf); raf = 0; hover = false; target = rest; cur = { ...rest }; paint(); }
    };
    motion.addEventListener('change', onMotion);
    const ro = new ResizeObserver(() => { measure(); if (!hover) { cur = { ...rest }; paint(); } });
    ro.observe(root);
    section.addEventListener('pointermove', onMove as EventListener);
    section.addEventListener('pointerleave', onLeave);
    return () => { window.clearTimeout(start); cancelAnimationFrame(raf); ro.disconnect(); motion.removeEventListener('change', onMotion); section.removeEventListener('pointermove', onMove as EventListener); section.removeEventListener('pointerleave', onLeave); };
  }, []);

  return (
    <h1 id="h1" className="hx-h1" ref={h1}>
      <span className="ln"><span>{pre}</span></span>{' '}
      <span className="ln"><span>{em}</span></span>{' '}
      <span className="ln"><span>{post}</span></span>
      <span className="lens-layer" aria-hidden="true" ref={layer}>
        <span className="ln"><span>{pre}</span></span>{' '}
        <span className="ln"><span data-lens-home>{em}</span></span>{' '}
        <span className="ln"><span>{post}</span></span>
      </span>
    </h1>
  );
}
