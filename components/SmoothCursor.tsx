'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './SmoothCursor.module.css';

export default function SmoothCursor() {
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Inner dot — very fast
  const dotX = useSpring(cursorX, { stiffness: 900, damping: 38 });
  const dotY = useSpring(cursorY, { stiffness: 900, damping: 38 });

  // Outer ring — lags behind for the smooth trail effect
  const ringX = useSpring(cursorX, { stiffness: 100, damping: 22 });
  const ringY = useSpring(cursorY, { stiffness: 100, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, [cursorX, cursorY, visible]);

  return (
    <>
      {/* Outer ring — trails behind */}
      <motion.div
        className={styles.ring}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Inner dot — snaps to cursor */}
      <motion.div
        className={styles.dot}
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}
