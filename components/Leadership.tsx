import Section from './Section';
import { resume } from '@/data/resume';
import styles from './Leadership.module.css';
import { Users, Calendar } from 'lucide-react';

export default function Leadership() {
  return (
    <Section id="leadership" number="07" title="Leadership">
      <div className={styles.grid}>
        {resume.leadership.map((l, i) => (
          <div key={i} className={styles.card}>
            <span className={styles.shimmer} aria-hidden="true" />

            <div className={styles.top}>
              <span className={styles.iconWrap}>
                <Users size={16} />
              </span>
              <span className={styles.duration}>
                <Calendar size={11} />
                {l.duration}
              </span>
            </div>

            <h3 className={styles.role}>{l.role}</h3>
            <p className={styles.org}>{l.org}</p>
            <p className={styles.desc}>{l.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
