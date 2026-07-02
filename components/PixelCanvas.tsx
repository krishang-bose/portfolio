'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

const CELL_SIZE = 12;
const GAP = 3;
const RADIUS = 150;
const MAX_LIFT = 60;
const MAX_SCALE = 0.4;
const EASE_UP = 0.1;
const EASE_DOWN = 0.1;

interface Cell {
  x: number;
  y: number;
  lift: number;  // physical height, eases slowly (EASE_UP)
  vis: number;   // visual opacity, eases fast so pixels appear quickly
  target: number;
}

export default function PixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  // Keep themeRef in sync without restarting the animation
  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0, height = 0, cols = 0, rows = 0;
    let cellIndexCache: { x: number; y: number }[] = [];
    let activeCells = new Map<number, Cell>();
    let mouse = { x: -9999, y: -9999 };
    let rafId: number;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      cols = Math.ceil(width / CELL_SIZE) + 1;
      rows = Math.ceil(height / CELL_SIZE) + 1;
      cellIndexCache = new Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cellIndexCache[r * cols + c] = { x: c * CELL_SIZE, y: r * CELL_SIZE };
        }
      }
      activeCells.clear();
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    }

    function onTouchEnd() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function update() {
      const minCol = Math.max(0, Math.floor((mouse.x - RADIUS) / CELL_SIZE));
      const maxCol = Math.min(cols - 1, Math.ceil((mouse.x + RADIUS) / CELL_SIZE));
      const minRow = Math.max(0, Math.floor((mouse.y - RADIUS) / CELL_SIZE));
      const maxRow = Math.min(rows - 1, Math.ceil((mouse.y + RADIUS) / CELL_SIZE));
      const seen = new Set<number>();

      if (mouse.x > -1000) {
        for (let r = minRow; r <= maxRow; r++) {
          for (let c = minCol; c <= maxCol; c++) {
            const idx = r * cols + c;
            const pos = cellIndexCache[idx];
            if (!pos) continue;
            const cx = pos.x + CELL_SIZE / 2;
            const cy = pos.y + CELL_SIZE / 2;
            const dx = cx - mouse.x;
            const dy = cy - mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < RADIUS * RADIUS) {
              const dist = Math.sqrt(distSq);
              // Linear falloff: center t=1, circumference t=0 — smooth dome gradient
              const t = 1 - dist / RADIUS;
              let cell = activeCells.get(idx);
              if (!cell) {
                cell = { x: pos.x, y: pos.y, lift: 0, vis: 0, target: 0 };
                activeCells.set(idx, cell);
              }
              cell.target = t;
              seen.add(idx);
            }
          }
        }
      }

      for (const [idx, cell] of activeCells) {
        if (!seen.has(idx)) cell.target = 0;
        // lift: instant snap
        const ease = cell.target > cell.lift ? EASE_UP : EASE_DOWN;
        cell.lift += (cell.target - cell.lift) * ease;
        // vis: instant snap
        const visEase = 0.7;
        cell.vis += (cell.target - cell.vis) * visEase;
        if (cell.target === 0 && cell.lift < 0.005 && cell.vis < 0.005) {
          activeCells.delete(idx);
        }
      }
    }

    function draw() {
      const isDark = themeRef.current === 'dark';

      // ── Solid background ──────────────────────────────────────────
      ctx!.fillStyle = isDark ? '#000000' : '#ffffff';
      ctx!.fillRect(0, 0, width, height);

      const size = CELL_SIZE - GAP;

      // ── Base tile grid (every cell, faint) ──────────────────────
      ctx!.fillStyle = isDark
        ? 'rgba(180, 0, 0, 0.01)'     // muted red on black
        : 'rgba(0, 102, 255, 0.01)';  // faint neon-blue on white
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pos = cellIndexCache[r * cols + c];
          if (pos) ctx!.fillRect(pos.x, pos.y, size, size);
        }
      }

      // ── Elevated hover blocks ─────────────────────────────────────
      for (const [, cell] of activeCells) {
        const lift = cell.lift;
        if (cell.vis < 0.003) continue;

        const liftPx = lift * MAX_LIFT;
        const scale = 1 + lift * MAX_SCALE * 0.4;
        const s = size * scale;
        const thick = Math.max(2, s * 0.4);
        const opacity = cell.vis;

        const cx = cell.x + CELL_SIZE / 2;
        const groundY = cell.y + CELL_SIZE / 2;
        const floatY = groundY - liftPx;
        const blockX = cx - s / 2;
        const sw = Math.max(1, s * 0.22);
        const topH = Math.max(2, s * 0.45);

        // Shadow on ground
        const shadowFade = 1 - lift * 0.75;
        const shadowScale = 1 - lift * 0.45;
        const shadowW = s * shadowScale;
        const shadowH = Math.max(1, thick * 0.35 * shadowScale);
        ctx!.fillStyle = isDark
          ? `rgba(255, 0, 0, ${shadowFade * 0.4})`
          : `rgba(0, 60, 255, ${shadowFade * 0.2})`;
        ctx!.fillRect(cx - shadowW / 2, cell.y + size * 0.6, shadowW, shadowH);

        if (isDark) {
          // ── DARK: muted red blocks ────────────────────────────────
          ctx!.fillStyle = `rgba(180,0,0,${opacity})`;
          ctx!.fillRect(blockX, floatY, s, thick);
          ctx!.fillStyle = `rgba(100,0,0,${opacity})`;
          ctx!.fillRect(blockX + s - sw, floatY, sw, thick);
          ctx!.fillStyle = `rgba(160,40,0,${opacity})`;
          ctx!.fillRect(blockX, floatY - topH, s, topH);
        } else {
          // ── LIGHT: neon blue blocks ───────────────────────────────
          // Front: bright neon blue
          ctx!.fillStyle = `rgba(0,102,255,${opacity})`;
          ctx!.fillRect(blockX, floatY, s, thick);
          // Side: deep navy
          ctx!.fillStyle = `rgba(0,40,180,${opacity})`;
          ctx!.fillRect(blockX + s - sw, floatY, sw, thick);
          // Top: neon cyan
          ctx!.fillStyle = `rgba(0,210,255,${opacity})`;
          ctx!.fillRect(blockX, floatY - topH, s, topH);
        }
      }
    }



    function loop() {
      update();
      draw();
      rafId = requestAnimationFrame(loop);
    }

    resize();
    loop();

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
