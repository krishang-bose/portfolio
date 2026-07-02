import Section from './Section';
import { resume } from '@/data/resume';
import styles from './Achievements.module.css';
import { Trophy, Medal, Code2, Star } from 'lucide-react';

const ICONS = [Trophy, Trophy, Medal, Code2];

export default function Achievements() {
  return (
    <Section id="achievements" number="05" title="Achievements">
      <div className={styles.list}>
        {resume.achievements.map((a, i) => {
          const Icon = ICONS[i] ?? Star;
          return (
            <div key={i} className={styles.row}>
              <span className={styles.iconWrap}>
                <Icon size={16} />
              </span>
              <div className={styles.content}>
                <div className={styles.titleRow}>
                  <span className={styles.title}>{a.title}</span>
                  {a.year && <span className={styles.year}>{a.year}</span>}
                </div>
                <div className={styles.sub}>
                  <span className={styles.detail}>{a.detail}</span>
                  <span className={styles.sep}>·</span>
                  <span className={styles.venue}>{a.venue}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
