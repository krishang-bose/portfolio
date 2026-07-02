'use client';
import styles from './BorderBeam.module.css';
import { ReactNode, CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Animation duration in seconds — slower = subtler */
  duration?: number;
  /** Inner content padding (defaults to card standard) */
  padding?: string;
}

/**
 * Wraps any card with a neon-blue rotating border beam.
 *
 * Layout model:
 *   .outer   ← card class applied here (border-radius, transition, transform etc.)
 *     .beam  ← 300×300% conic-gradient spinner, clipped by overflow:hidden on .outer
 *     .inner ← margin:1px inset, var(--clr-surface) background covers the interior
 *               leaving only a 1 px "border" where the beam shows through
 */
export default function BorderBeam({
  children,
  className = '',
  style,
  duration = 5,
  padding = '1.4rem',
}: Props) {
  return (
    <div
      className={`${styles.outer} ${className}`}
      style={style}
    >
      <span
        className={styles.beam}
        aria-hidden="true"
        style={{ '--d': `${duration}s` } as CSSProperties}
      />
      <div className={styles.inner} style={{ padding }}>
        {children}
      </div>
    </div>
  );
}
