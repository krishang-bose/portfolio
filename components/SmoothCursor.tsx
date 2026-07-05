'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function SmoothCursor() {
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const dotX = useSpring(cursorX, { stiffness: 900, damping: 38 });
  const dotY = useSpring(cursorY, { stiffness: 900, damping: 38 });

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
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-[34px] h-[34px] rounded-full pointer-events-none z-[99999] border-[1.5px] transition-[border-color] duration-300"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          borderColor: 'var(--accent-1)',
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full pointer-events-none z-[99999] transition-[background] duration-300"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          background: 'var(--accent-1)',
        }}
      />
    </>
  );
}
