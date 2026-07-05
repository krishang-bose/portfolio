'use client';

import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

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
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center gap-8 px-10 h-[58px] border-b transition-all duration-300 max-md:px-5"
      style={{
        background: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(248,248,248,0.95)',
        borderColor: scrolled ? 'rgba(0,255,135,0.15)' : 'var(--clr-border)',
        boxShadow: scrolled ? '0 1px 0 rgba(0,255,135,0.05)' : undefined,
      }}
    >
      <a href="#hero" className="no-underline flex-shrink-0">
        <span
          className="font-mono text-base font-bold tracking-[0.08em] transition-all duration-200"
          style={{
            color: 'var(--neon-green)',
            textShadow: '0 0 10px var(--glow-green)',
          }}
        >
          KB
        </span>
      </a>

      <ul className="flex list-none ml-auto gap-0 max-[540px]:hidden">
        {NAV_LINKS.map((l) => {
          const isActive = activeSection === l.href.slice(1);
          return (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-block px-3 py-[0.3rem] font-mono text-[0.7rem] tracking-[0.07em] uppercase no-underline relative transition-colors duration-200 max-md:text-[0.63rem] max-md:px-2"
                style={{ color: isActive ? 'var(--neon-green)' : 'var(--clr-secondary)' }}
              >
                {l.label}
                <span
                  className="absolute bottom-[-1px] left-3 right-3 h-px transition-transform duration-200 ease-out"
                  style={{
                    background: 'var(--neon-green)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
              </a>
            </li>
          );
        })}
      </ul>

      <button
        id="theme-toggle"
        onClick={toggle}
        className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-[6px] border transition-all duration-200 cursor-none"
        style={{
          background: 'var(--clr-surface)',
          borderColor: 'var(--clr-border-hi)',
          color: 'var(--clr-secondary)',
        }}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </nav>
  );
}
