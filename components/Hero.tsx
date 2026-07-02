'use client';

import { resume } from '@/data/resume';
import styles from './Hero.module.css';
import PixelGlobe from './PixelGlobe';
import { useEffect, useState } from 'react';
import { Mail, ArrowDown, ExternalLink } from 'lucide-react';

function GithubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const ROLES = [
  'Full-Stack Developer',
  'AI / LLM Builder',
  'Competitive Programmer',
  'Quantum Researcher',
];

export default function Hero() {
  const { name, contact } = resume;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className={styles.hero} id="hero">
      {/* Retro perspective grid at bottom */}
      <div className="retro-grid" aria-hidden="true" />

      {/* Left: Text content */}
      <div className={styles.content}>
        <p className={styles.greeting}>
          <span className={styles.dot} />
          Available for opportunities
        </p>

        <h1 className={styles.name}>{name}</h1>

        <div className={styles.roleWrap}>
          <span className={styles.rolePrefix}>I&apos;m a </span>
          <span className={styles.role}>{displayed}</span>
          <span className={styles.cursor} aria-hidden="true">_</span>
        </div>

        <p className={styles.subtitle}>
          B.Tech CSE (Quantum Computing) · Bennett University · Merit Scholar
        </p>

        <div className={styles.contactBar}>
          <a href={`mailto:${contact.email}`} className={styles.contactPill} title="Email">
            <Mail size={12} />
            <span>{contact.email}</span>
          </a>
          <a href={contact.github.url} target="_blank" rel="noopener noreferrer" className={styles.contactPill} title="GitHub">
            <GithubIcon size={12} />
            <span>GitHub</span>
          </a>
          <a href={contact.linkedin.url} target="_blank" rel="noopener noreferrer" className={styles.contactPill} title="LinkedIn">
            <LinkedinIcon size={12} />
            <span>LinkedIn</span>
          </a>
        </div>

        <div className={styles.ctas}>
          <a href="#projects" className={styles.btnPrimary}>
            View Projects
            <ExternalLink size={14} />
          </a>
          <a href="#contact" className={styles.btnSecondary}>
            Get in Touch
          </a>
        </div>
      </div>

      {/* Right: Globe — clear of text */}
      <div className={styles.globeWrap} aria-hidden="true">
        <div className={styles.globeGlow} />
        <PixelGlobe size={550} />
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <span>scroll</span>
        <ArrowDown size={13} className={styles.scrollArrow} />
      </div>
    </section>
  );
}
