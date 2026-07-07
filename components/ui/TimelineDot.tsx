'use client';

// UIverse orb by andrew-manzyk, adapted for theme colors + scaled to timeline size
// Metaball gooey effect: feGaussianBlur per polygon → feColorMatrix contrast on group → sharp blobs

interface TimelineDotProps {
  variant: 'cyan' | 'green';
  index: number;
}

const POLY = '50,5 95,85 5,85'; // equilateral triangle, 100×100 space

export function TimelineDot({ variant, index }: TimelineDotProps) {
  const uid = `tl-orb-${variant}-${index}`;
  const maskId    = `${uid}-mask`;
  const blurId    = `${uid}-blur`;
  const contrastId = `${uid}-contrast`;

  const c1 = variant === 'cyan' ? 'var(--neon-cyan)'  : 'var(--neon-green)';
  const c2 = variant === 'cyan' ? 'var(--accent-4)'   : 'var(--accent-2)';
  const c3 = variant === 'cyan' ? 'var(--glow-cyan)'  : 'var(--glow-green)';

  return (
    <div className="tl-orb-wrapper">
      <div
        className="tl-orb"
        style={{ '--tl-c1': c1, '--tl-c2': c2, '--tl-c3': c3 } as React.CSSProperties}
      >
        {/* Gradient box masked by the morphing SVG blob */}
        <div
          className="tl-orb-box"
          style={{
            WebkitMask: `url(#${maskId})`,
            mask: `url(#${maskId})`,
          }}
        />

        {/* Hidden SVG — defines the mask + filters only */}
        <svg
          className="tl-orb-svg"
          width="100"
          height="100"
          aria-hidden="true"
        >
          <defs>
            {/* Blur filter applied per-polygon */}
            <filter
              id={blurId}
              x="-30%" y="-30%" width="160%" height="160%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
            </filter>

            {/* Contrast filter applied to the whole group → metaball merge */}
            <filter
              id={contrastId}
              x="-20%" y="-20%" width="140%" height="140%"
              colorInterpolationFilters="sRGB"
            >
              {/* Boost luminance: areas that overlap stay white, edges clip to black */}
              <feColorMatrix
                type="matrix"
                values="20 0 0 0 -9  0 20 0 0 -9  0 0 20 0 -9  0 0 0 1 0"
              />
            </filter>

            <mask id={maskId}>
              {/* Black background — polygons (white) poke holes = visible areas */}
              <rect width="100" height="100" fill="black" />
              <g filter={`url(#${contrastId})`}>
                {/* p1 — static, rotated 90° around top-right anchor */}
                <polygon
                  fill="white"
                  points={POLY}
                  filter={`url(#${blurId})`}
                  style={{ transformOrigin: '75px 25px', transform: 'rotate(90deg)' }}
                />
                {/* p2 — rotates reverse around centre */}
                <polygon fill="white" points={POLY} filter={`url(#${blurId})`} className="tl-orb-p2" />
                {/* p3 — forward, delayed */}
                <polygon fill="white" points={POLY} filter={`url(#${blurId})`} className="tl-orb-p3" />
                {/* p4 — reverse, off-centre */}
                <polygon fill="white" points={POLY} filter={`url(#${blurId})`} className="tl-orb-p4" />
                {/* p5 — reverse, same origin, different delay */}
                <polygon fill="white" points={POLY} filter={`url(#${blurId})`} className="tl-orb-p5" />
                {/* p6 — forward, right-of-centre */}
                <polygon fill="white" points={POLY} filter={`url(#${blurId})`} className="tl-orb-p6" />
                {/* p7 — forward, same, different delay */}
                <polygon fill="white" points={POLY} filter={`url(#${blurId})`} className="tl-orb-p7" />
              </g>
            </mask>
          </defs>
        </svg>
      </div>
    </div>
  );
}
