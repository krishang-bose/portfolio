'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import styles from './PixelGlobe.module.css';

const CELL = 7;          // pixel block size
const GAP = 1;          // gap between blocks
const SPEED = 0.004;     // radians per frame (~26 s/revolution)

// ── World map ─────────────────────────────────────────────────────────────
// 72 cols × 36 rows, each cell = 5° lon × 5° lat
// col 0 = 180°W … col 35 = 0° … col 71 = 175°E
// row 0 = 90°N … row 18 = equator … row 35 = 90°S
function land(...segs: Array<[number, number]>): boolean[] {
  const a = new Array(72).fill(false);
  for (const [s, e] of segs) for (let i = s; i <= e; i++) a[i] = true;
  return a;
}

const MAP: boolean[][] = [
/* 0  90N */ land(),
/* 1  85N */ land([23, 27], [50, 53]),
/* 2  80N */ land([18, 22], [23, 28], [47, 54]),
/* 3  75N */ land([5, 9], [14, 22], [23, 28], [37, 38], [44, 60]),
/* 4  70N */ land([5, 10], [11, 22], [23, 28], [38, 40], [42, 63]),
/* 5  65N */ land([6, 11], [11, 22], [23, 28], [31, 32], [37, 40], [41, 63]),
/* 6  60N */ land([6, 11], [11, 22], [23, 26], [34, 35], [37, 40], [41, 63]),
/* 7  55N */ land([11, 23], [34, 35], [36, 40], [41, 64]),
/* 8  50N */ land([12, 23], [34, 35], [36, 42], [42, 64]),
/* 9  45N */ land([12, 23], [33, 35], [36, 43], [42, 63], [62, 64]),
/* 10 40N */ land([12, 23], [33, 35], [36, 43], [42, 62], [62, 64]),
/* 11 35N */ land([12, 23], [32, 35], [33, 43], [41, 47], [48, 53], [51, 62], [62, 64]),
/* 12 30N */ land([14, 21], [32, 44], [43, 46], [49, 53], [51, 62]),
/* 13 25N */ land([15, 18], [19, 20], [31, 44], [42, 46], [49, 53], [51, 61], [60, 60]),
/* 14 20N */ land([15, 19], [17, 20], [31, 43], [44, 46], [49, 53], [54, 58], [59, 61]),
/* 15 15N */ land([17, 19], [32, 43], [42, 45], [49, 53], [54, 58], [59, 61]),
/* 16 10N */ land([18, 19], [21, 22], [32, 37], [37, 44], [42, 44], [49, 52], [54, 58], [59, 61]),
/* 17  5N */ land([20, 22], [32, 36], [37, 44], [43, 45], [54, 56], [57, 59], [59, 60], [61, 63]),
/* 18  0  */ land([21, 21], [32, 35], [37, 43], [54, 56], [57, 59], [62, 64]),
/* 19  5S */ land([21, 25], [32, 35], [37, 41], [57, 59], [62, 65]),
/* 20 10S */ land([22, 26], [37, 41], [39, 42], [57, 59], [61, 66]),
/* 21 15S */ land([22, 26], [37, 40], [42, 43], [44, 45], [60, 66]),
/* 22 20S */ land([22, 26], [37, 40], [41, 43], [44, 44], [59, 66]),
/* 23 25S */ land([22, 26], [37, 41], [41, 43], [44, 44], [59, 66]),
/* 24 30S */ land([23, 25], [36, 42], [59, 66]),
/* 25 35S */ land([23, 25], [36, 40], [59, 64], [68, 69]),
/* 26 40S */ land([23, 24], [36, 39], [59, 63], [68, 69]),
/* 27 45S */ land([23, 24], [68, 69]),
/* 28 50S */ land([23, 24]),
/* 29 55S */ land([23, 24]),
/* 30 60S */ land(),
/* 31 65S */ land([30, 40]),
/* 32 70S */ land([28, 42]),
/* 33 75S */ land([27, 43]),
/* 34 80S */ land([26, 44]),
/* 35 85S */ land([25, 45]),
];

function onLand(latDeg: number, lonDeg: number): boolean {
  const row = Math.min(35, Math.max(0, Math.floor((90 - latDeg) / 5)));
  const col = (((Math.floor((lonDeg + 180) / 5)) % 72) + 72) % 72;
  return MAP[row][col];
}



// ── Component ─────────────────────────────────────────────────────────────
export default function PixelGlobe({ size = 300 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const S = size;
    canvas.width = S;
    canvas.height = S;
    const cx = S / 2;
    const cy = S / 2;
    const R = S / 2 - CELL * 2;   // globe radius (leave room for edge)

    let rotation = 0;
    let rafId: number;

    // Light direction (upper-left, slightly toward viewer)
    const LX = -0.35, LY = -0.50, LZ = 0.80;
    const LL = Math.sqrt(LX * LX + LY * LY + LZ * LZ);

    function draw() {
      const c = ctx as CanvasRenderingContext2D;
      const dark = themeRef.current === 'dark';

      // Clear canvas each frame so old colours don't bleed through
      c.clearRect(0, 0, S, S);

      for (let py = Math.floor(cy - R) - CELL; py <= cy + R; py += CELL) {
        for (let px = Math.floor(cx - R) - CELL; px <= cx + R; px += CELL) {
          const pcx = px + CELL / 2;
          const pcy = py + CELL / 2;
          const dx = pcx - cx;
          const dy = pcy - cy;
          const d2 = dx * dx + dy * dy;
          if (d2 > R * R) continue;

          const nz = Math.sqrt(Math.max(0, 1 - d2 / (R * R)));
          const nx = dx / R;
          const ny = dy / R;

          const latDeg = Math.asin(-ny) * 180 / Math.PI;
          const lonRaw = Math.atan2(nx, nz) - rotation;
          const lonDeg = (((lonRaw * 180 / Math.PI) + 540) % 360) - 180;

          const isLandCell = onLand(latDeg, lonDeg);

          const diffuse = Math.max(0, (nx * LX + ny * LY + nz * LZ) / LL);
          const edgeDist = R - Math.sqrt(d2);
          const alpha = Math.min(1, edgeDist / (CELL * 1.8));

          c.globalAlpha = alpha;

          if (isLandCell) {
            if (dark) {
              // ── DARK: steel-blue / slate — matches deep-space navy palette ──
              const t = Math.pow(diffuse, 0.7);
              const r = Math.round(18  + (74  - 18)  * t);   // very dark → muted blue
              const g = Math.round(36  + (140 - 36)  * t);
              const b = Math.round(58  + (176 - 58)  * t);
              c.fillStyle = `rgb(${r},${g},${b})`;
              c.fillRect(px, py, CELL - GAP, CELL - GAP);
              // Top highlight strip — slightly lighter steel
              const ht = Math.min(1, t + 0.22);
              const hr = Math.round(18  + (74  - 18)  * ht);
              const hg = Math.round(36  + (140 - 36)  * ht);
              const hb = Math.round(58  + (200 - 58)  * ht);
              c.fillStyle = `rgb(${hr},${hg},${hb})`;
              c.fillRect(px, py, CELL - GAP, Math.max(1, Math.floor((CELL - GAP) * 0.28)));

            } else {
              // ── LIGHT: deep blue → white ────────────────────────────────
              const t = Math.pow(diffuse, 0.6);
              const r = Math.round(0   + (255 - 0)   * t);
              const g = Math.round(40  + (255 - 40)  * t);
              const b = Math.round(160 + (255 - 160) * t);
              c.fillStyle = `rgb(${r},${g},${b})`;
              c.fillRect(px, py, CELL - GAP, CELL - GAP);
              // Top strip — slightly brighter
              const ht = Math.min(1, t + 0.25);
              const hr = Math.round(0   + (255 - 0)   * ht);
              const hg = Math.round(40  + (255 - 40)  * ht);
              const hb = Math.round(160 + (255 - 160) * ht);
              c.fillStyle = `rgb(${hr},${hg},${hb})`;
              c.fillRect(px, py, CELL - GAP, Math.max(1, Math.floor((CELL - GAP) * 0.28)));
            }

          } else {
            if (dark) {
              c.globalAlpha = alpha * (0.06 + 0.09 * diffuse);
              c.fillStyle = `rgb(8,20,42)`;  // very dark navy ocean
            } else {
              c.globalAlpha = alpha * (0.07 + 0.10 * diffuse);
              c.fillStyle = `rgb(0,100,220)`;
            }
            c.fillRect(px, py, CELL - GAP, CELL - GAP);
          }

          c.globalAlpha = 1;
        }
      }

      rotation += SPEED;
    }

    function loop() { draw(); rafId = requestAnimationFrame(loop); }
    loop();
    return () => cancelAnimationFrame(rafId);
  }, [size]);

  return <canvas ref={canvasRef} className={styles.globe} />;
}
