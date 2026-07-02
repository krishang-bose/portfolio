import Section from './Section';
import { resume } from '@/data/resume';
import styles from './Research.module.css';
import { FlaskConical, ExternalLink, BookOpen } from 'lucide-react';

export default function Research() {
  return (
    <Section id="research" number="04" title="Research">
      {resume.research.map((r, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.accentBar} />

          <div className={styles.header}>
            <div className={styles.iconWrap}>
              <FlaskConical size={18} />
            </div>
            <div className={styles.meta}>
              <span className={styles.year}>{r.year}</span>
              <span className={styles.status}>
                <BookOpen size={10} />
                {r.status}
              </span>
            </div>
          </div>

          <h3 className={styles.title}>{r.title}</h3>

          <p className={styles.affil}>{r.affiliation}</p>

          <ul className={styles.bullets}>
            {r.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>

          <a href={r.link.url} className={styles.link}>
            <ExternalLink size={12} />
            {r.link.label}
          </a>
        </div>
      ))}
    </Section>
  );
}
