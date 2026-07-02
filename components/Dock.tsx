'use client';

import { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import {
  Home, GraduationCap, Cpu, Briefcase, Code2,
  Trophy, FlaskConical, Users, Mail,
} from 'lucide-react';
import AnimatedThemeToggler from './AnimatedThemeToggler';
import styles from './Dock.module.css';

const NAV_ITEMS = [
  { href: '#hero', label: 'Home', Icon: Home },
  { href: '#projects', label: 'Projects', Icon: Code2 },
  { href: '#research', label: 'Research', Icon: FlaskConical },
  { href: '#experience', label: 'Experience', Icon: Briefcase },
  { href: '#skills', label: 'Skills', Icon: Cpu },
  { href: '#contact', label: 'Contact', Icon: Mail },
];

/* Scale only the hovered item — neighbours are unaffected */
function DockItem({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<{ size: number }>;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={styles.itemWrap}>
      <AnimatePresence>
        {hovered && (
          <motion.span
            className={styles.tooltip}
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
        className={styles.item}
        style={{ transformOrigin: 'bottom center' }}
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
      className={styles.dock}
      initial={{ y: 120, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ type: 'spring', stiffness: 200, damping: 26, delay: 0.2 }}
      aria-label="Site navigation"
    >
      {NAV_ITEMS.map((item) => (
        <DockItem key={item.href} {...item} />
      ))}

      <div className={styles.divider} />

      {/* Animated theme toggle */}
      <div className={styles.itemWrap}>
        <AnimatedThemeToggler className={styles.item} />
      </div>
    </motion.nav>
  );
}
