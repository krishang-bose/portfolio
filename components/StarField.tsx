'use client';

import { useTheme } from '@/context/ThemeContext';
import { useEffect, useRef } from 'react';

/* ── Layer speeds match CSS animStar exactly ────────────────────── */
const DARK_LAYERS = [
  { count: 500, drawR: 0.5, drift: 0.667, color: 'rgba(255,255,255,0.90)' },
  { count: 200, drawR: 1.0, drift: 0.333, color: 'rgba(255,255,255,0.70)' },
  { count: 100, drawR: 1.5, drift: 0.222, color: 'rgba(255,255,255,0.60)' },
];

const LIGHT_LAYERS = [
  { count: 500, drawR: 0.7, drift: 0.667, color: 'rgba(51,85,238,0.30)' },
  { count: 200, drawR: 1.2, drift: 0.333, color: 'rgba(132,95,227,0.50)' },
  { count: 200, drawR: 1.8, drift: 0.222, color: 'rgba(9,192,229,0.80)' },
];

/* ── Mouse cursor ring ──────────────────────────────────────────── */
const EFFECT_RADIUS = 280;  // cursor attract zone
const RING_RADIUS = 80;   // ring radius around cursor
const ATTRACT_K = 0.008;
const RETURN_K = 0.04;
const DAMPING = 0.90;

/* ── Hover-element repulsion ("release stars") ──────────────────── */
const REPEL_RADIUS = 200;  // px around element edge where stars feel it
const REPEL_K = 2.8;  // burst strength — much stronger than attract

/* Interactive selector — elements that trigger star release */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, label, select';

interface Star {
  x: number; y: number;
  dx: number; dy: number;
  vdx: number; vdy: number;
  drawR: number; drift: number; color: string;
}

/* Hover state: centre + half-diagonal of the hovered element */
interface HoverState {
  x: number; y: number;
  hw: number; hh: number;  // half-width, half-height
  active: boolean;
}

export default function StarField() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const hoverRef = useRef<HoverState>({ x: 0, y: 0, hw: 0, hh: 0, active: false });
  const rafRef = useRef(0);
  const wRef = useRef(0);
  const hRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const LAYERS = theme === 'dark' ? DARK_LAYERS : LIGHT_LAYERS;

    /* ── Init stars ─────────────────────────────────────────────── */
    function init() {
      wRef.current = window.innerWidth;
      hRef.current = window.innerHeight;
      canvas!.width = wRef.current;
      canvas!.height = hRef.current;
      starsRef.current = [];
      for (const { count, drawR, drift, color } of LAYERS) {
        for (let i = 0; i < count; i++) {
          starsRef.current.push({
            x: Math.random() * wRef.current,
            y: Math.random() * hRef.current,
            dx: 0, dy: 0, vdx: 0, vdy: 0,
            drawR, drift, color,
          });
        }
      }
    }

    /* ── Animation tick ─────────────────────────────────────────── */
    function tick() {
      const W = wRef.current;
      const H = hRef.current;
      ctx!.clearRect(0, 0, W, H);

      const { x: mx, y: my, active: mActive } = mouseRef.current;
      const { x: hx, y: hy, hw, hh, active: hActive } = hoverRef.current;

      for (const s of starsRef.current) {
        /* 1. Direct upward drift ─────────────────────────────── */
        s.y -= s.drift;
        if (s.y < -2) {
          s.y = hRef.current + 2;
          s.x = Math.random() * W;
          s.dx = 0; s.dy = 0; s.vdx = 0; s.vdy = 0;
        }

        const drawX = s.x + s.dx;
        const drawY = s.y + s.dy;

        /* 2. Prioritise hover-repulsion over cursor attraction ── */
        if (hActive) {
          /* Vector from element centre → star (outward = positive) */
          const rdx = drawX - hx;
          const rdy = drawY - hy;

          /* Closest point on the element's AABB to the star */
          const clampedX = Math.max(hx - hw, Math.min(hx + hw, drawX));
          const clampedY = Math.max(hy - hh, Math.min(hy + hh, drawY));
          const edgeDX = drawX - clampedX;
          const edgeDY = drawY - clampedY;
          const edgeDist = Math.hypot(edgeDX, edgeDY);

          if (edgeDist < REPEL_RADIUS && edgeDist > 0.5) {
            /* Falloff: strongest at edge, zero at REPEL_RADIUS */
            const t = 1 - edgeDist / REPEL_RADIUS;
            const f = t * t * REPEL_K;           // quadratic falloff → snappy burst
            const len = Math.hypot(rdx, rdy) || 1;
            s.vdx += (rdx / len) * f;
            s.vdy += (rdy / len) * f;
          }

        } else if (mActive) {
          /* Cursor ring attraction ────────────────────────── */
          const cdx = mx - drawX;
          const cdy = my - drawY;
          const dist = Math.hypot(cdx, cdy);
          if (dist < EFFECT_RADIUS && dist > 0.5) {
            const error = dist - RING_RADIUS;
            const f = error * ATTRACT_K;
            s.vdx += (cdx / dist) * f;
            s.vdy += (cdy / dist) * f;
          } else {
            s.vdx += -s.dx * RETURN_K;
            s.vdy += -s.dy * RETURN_K;
          }

        } else {
          /* Spring displacement back to zero ─────────────── */
          s.vdx += -s.dx * RETURN_K;
          s.vdy += -s.dy * RETURN_K;
        }

        s.vdx *= DAMPING;
        s.vdy *= DAMPING;
        s.dx += s.vdx;
        s.dy += s.vdy;

        /* 3. Draw ────────────────────────────────────────── */
        ctx!.beginPath();
        ctx!.arc(drawX, drawY, s.drawR, 0, Math.PI * 2);
        ctx!.fillStyle = s.color;
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    /* ── Event listeners ────────────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => { mouseRef.current.active = false; };

    /* Event delegation: catch any interactive element being hovered */
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(INTERACTIVE);
      if (el) {
        const r = (el as HTMLElement).getBoundingClientRect();
        hoverRef.current = {
          x: r.left + r.width / 2,
          y: r.top + r.height / 2,
          hw: r.width / 2,
          hh: r.height / 2,
          active: true,
        };
      }
    };
    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(INTERACTIVE);
      if (el) hoverRef.current.active = false;
    };

    init();
    tick();

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
}
