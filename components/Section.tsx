'use client';

import { useEffect, useRef, ReactNode } from 'react';
import styles from './Section.module.css';

interface Props {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}

export default function Section({ id, number, title, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <span className={styles.number}>{number}</span>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.line} />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}
