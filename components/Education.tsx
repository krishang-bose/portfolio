import Section from './Section';
import { resume } from '@/data/resume';
import styles from './Education.module.css';
import { MapPin, Calendar, Award } from 'lucide-react';

export default function Education() {
  return (
    <Section id="education" number="01" title="Education">
      <div className={styles.timeline}>
        {resume.education.map((edu, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.rail}>
              <div className={styles.dot} />
              {i < resume.education.length - 1 && <div className={styles.line} />}
            </div>
            <div className={styles.card}>
              <span className={styles.shimmer} aria-hidden="true" />

              <div className={styles.header}>
                <div>
                  <h3 className={styles.institution}>{edu.institution}</h3>
                  <p className={styles.degree}>{edu.degree}</p>
                </div>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <Calendar size={11} />
                    {edu.duration}
                  </span>
                  <span className={styles.metaItem}>
                    <MapPin size={11} />
                    {edu.location}
                  </span>
                </div>
              </div>

              <div className={styles.bottom}>
                <span className={styles.badge}>
                  <Award size={11} />
                  {edu.badge}
                </span>
                <span className={styles.cgpa}>
                  GPA&nbsp;<strong>{edu.cgpa}</strong>
                  {Number(edu.cgpa) <= 10 ? ' / 10' : '%'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
