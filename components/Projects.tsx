'use client';

import Section from './Section';
import { resume } from '@/data/resume';
import styles from './Projects.module.css';
import { ExternalLink, Tag } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const DARK_TAG_COLORS: Record<string, string> = {
  'Full Stack':       '#5577cc',
  'AI':              '#4466bb',
  'Hackathon Winner': '#6688dd',
  'Frontend':        '#3355aa',
  'Backend':         '#7799ee',
};

const LIGHT_TAG_COLORS: Record<string, string> = {
  'Full Stack':       '#3355ee',
  'AI':              '#7755cc',
  'Hackathon Winner': '#00b4d8',
  'Frontend':        '#4466ff',
  'Backend':         '#9966dd',
};

export default function Projects() {
  const { theme } = useTheme();
  const TAG_COLORS = theme === 'dark' ? DARK_TAG_COLORS : LIGHT_TAG_COLORS;

  return (
    <Section id="projects" number="06" title="Projects">
      <div className={styles.bento}>
        {resume.projects.map((p, i) => (
          <div key={i} className={`${styles.card} ${i === 0 ? styles.featured : ''}`}>
            {/* Shimmer sweep on hover */}
            <span className={styles.shimmer} aria-hidden="true" />

            <div className={styles.cardTop}>
              <div className={styles.tagRow}>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className={styles.tag}
                    style={{ '--tag-color': TAG_COLORS[t] ?? TAG_COLORS['Full Stack'] } as React.CSSProperties}
                  >
                    <Tag size={10} />
                    {t}
                  </span>
                ))}
              </div>
              <span className={styles.year}>{p.year}</span>
            </div>

            <h3 className={styles.name}>{p.name}</h3>

            <ul className={styles.bullets}>
              {p.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>

            <div className={styles.footer}>
              <div className={styles.stack}>
                {p.stack.map((t) => (
                  <span key={t} className={styles.tech}>{t}</span>
                ))}
              </div>
              <div className={styles.links}>
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {l.label}
                    <ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
