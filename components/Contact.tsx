import Section from './Section';
import { resume } from '@/data/resume';
import styles from './Contact.module.css';
import { Mail, ExternalLink } from 'lucide-react';

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Contact() {
  const { contact } = resume;

  return (
    <Section id="contact" number="08" title="Contact">
      <div className={styles.hero}>
        <h3 className={styles.cta}>Let&apos;s Build <span>Something Great</span></h3>
        <p className={styles.sub}>
          Open to internships, collaborations, and interesting projects. Drop a message!
        </p>
      </div>

      <div className={styles.grid}>
        <a href={`mailto:${contact.email}`} className={styles.card}>
          <span className={styles.icon}><Mail size={20} /></span>
          <div className={styles.cardBody}>
            <p className={styles.label}>Email</p>
            <p className={styles.value}>{contact.email}</p>
          </div>
          <ExternalLink size={14} className={styles.arrow} />
        </a>

        <a href={contact.linkedin.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
          <span className={styles.icon}><LinkedinIcon size={20} /></span>
          <div className={styles.cardBody}>
            <p className={styles.label}>LinkedIn</p>
            <p className={styles.value}>{contact.linkedin.label}</p>
          </div>
          <ExternalLink size={14} className={styles.arrow} />
        </a>
      </div>
    </Section>
  );
}
