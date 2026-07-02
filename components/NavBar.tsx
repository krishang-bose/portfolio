'use client';

import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './NavBar.module.css';

const NAV_LINKS = [
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
];

export default function NavBar() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#hero" className={styles.logo}>
        <span className={styles.logoText}>KB</span>
      </a>
      <ul className={styles.links}>
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className={`${styles.link} ${activeSection === l.href.slice(1) ? styles.active : ''}`}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        id="theme-toggle"
        onClick={toggle}
        className={styles.toggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </nav>
  );
}
