'use client';

import Section from './Section';
import { resume } from '@/data/resume';
import styles from './Skills.module.css';
import { useTheme } from '@/context/ThemeContext';

const DARK_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'Languages':          { bg: 'rgba(13,21,50,0.55)',  border: 'rgba(85,119,204,0.28)',  text: '#6688cc' },
  'AI / LLM':          { bg: 'rgba(11,19,46,0.55)',  border: 'rgba(68,102,187,0.28)',  text: '#5577bb' },
  'Frameworks & Tools': { bg: 'rgba(10,18,44,0.55)', border: 'rgba(102,136,221,0.28)', text: '#7799dd' },
};

const LIGHT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'Languages':          { bg: 'rgba(51,85,238,0.08)',  border: 'rgba(51,85,238,0.28)',  text: '#3355ee' },
  'AI / LLM':          { bg: 'rgba(119,85,204,0.08)', border: 'rgba(119,85,204,0.28)', text: '#7755cc' },
  'Frameworks & Tools': { bg: 'rgba(0,180,216,0.08)',  border: 'rgba(0,180,216,0.28)',  text: '#008aaa' },
};

export default function Skills() {
  const { theme } = useTheme();
  const CATEGORY_COLORS = theme === 'dark' ? DARK_COLORS : LIGHT_COLORS;

  return (
    <Section id="skills" number="02" title="Technical Skills">
      <div className={styles.groups}>
        {resume.skills.map((group, i) => {
          const color = CATEGORY_COLORS[group.category] ?? CATEGORY_COLORS['Languages'];
          return (
            <div key={i} className={styles.group}>
              <span className={styles.category} style={{ color: color.text }}>
                {group.category}
              </span>
              <div className={styles.tags}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={styles.tag}
                    style={{
                      background: color.bg,
                      borderColor: color.border,
                      color: color.text,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
