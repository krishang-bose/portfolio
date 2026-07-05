'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Code2, FlaskConical, Briefcase, Cpu, Mail,
} from 'lucide-react';
import AnimatedThemeToggler from './AnimatedThemeToggler';

const NAV_ITEMS = [
  { href: '#hero', label: 'Home', Icon: Home },
  { href: '#projects', label: 'Projects', Icon: Code2 },
  { href: '#research', label: 'Research', Icon: FlaskConical },
  { href: '#experience', label: 'Experience', Icon: Briefcase },
  { href: '#skills', label: 'Skills', Icon: Cpu },
  { href: '#contact', label: 'Contact', Icon: Mail },
];

function DockItem({ href, label, Icon }: { href: string; label: string; Icon: React.ComponentType<{ size: number }> }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.62rem] font-mono tracking-[0.06em] px-[0.55rem] py-[0.22rem] rounded-[7px] pointer-events-none z-10 shadow-md"
            style={{
              color: 'var(--clr-text)',
              background: 'var(--clr-surface-2)',
              border: '1px solid var(--clr-border-hi)',
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.12 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        className="flex items-center justify-center w-11 h-11 rounded-[12px] border no-underline cursor-none transition-colors duration-[0.18s] max-[640px]:w-[38px] max-[640px]:h-[38px] max-[400px]:w-8 max-[400px]:h-8"
        style={{
          background: 'var(--clr-surface-2)',
          borderColor: 'var(--clr-border)',
          color: 'var(--clr-secondary)',
          transformOrigin: 'bottom center',
        }}
        whileHover={{ scale: 1.75 }}
        transition={{ type: 'spring', mass: 0.1, stiffness: 220, damping: 14 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={label}
      >
        <Icon size={20} />
      </motion.a>
    </div>
  );
}

export default function Dock() {
  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 z-[200] flex items-end gap-6 px-[0.8rem] py-[0.6rem] rounded-[22px] border backdrop-blur-[28px] max-[640px]:gap-2 max-[640px]:px-[0.65rem] max-[640px]:py-[0.45rem] max-[400px]:gap-[0.3rem]"
      style={{
        background: 'rgba(243,245,255,0.35)',
        borderColor: 'var(--clr-border-hi)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px var(--clr-border), 0 0 28px var(--glow-green)',
      }}
      initial={{ y: 120, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ type: 'spring', stiffness: 200, damping: 26, delay: 0.2 }}
      aria-label="Site navigation"
    >
      {NAV_ITEMS.map((item) => (
        <DockItem key={item.href} {...item} />
      ))}

      <div
        className="w-px h-7 self-center flex-shrink-0 mx-[0.15rem]"
        style={{ background: 'var(--clr-border-hi)' }}
      />

      <div className="relative flex flex-col items-center">
        <AnimatedThemeToggler />
      </div>
    </motion.nav>
  );
}
