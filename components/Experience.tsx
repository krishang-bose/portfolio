import Section from './Section';
import { resume } from '@/data/resume';
import styles from './Experience.module.css';
import { MapPin, Calendar } from 'lucide-react';

export default function Experience() {
  return (
    <Section id="experience" number="03" title="Experience">
      <div className={styles.timeline}>
        {resume.experience.map((exp, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.rail}>
              <div className={styles.dot} />
              {i < resume.experience.length - 1 && <div className={styles.line} />}
            </div>
            <div className={styles.card}>
              {/* Shimmer */}
              <span className={styles.shimmer} aria-hidden="true" />

              <div className={styles.header}>
                <div>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <p className={styles.company}>{exp.company}</p>
                </div>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <Calendar size={11} />
                    {exp.duration}
                  </span>
                  <span className={styles.metaItem}>
                    <MapPin size={11} />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className={styles.stack}>
                {exp.stack.map((t) => (
                  <span key={t} className={styles.tech}>{t}</span>
                ))}
              </div>

              <ul className={styles.bullets}>
                {exp.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
