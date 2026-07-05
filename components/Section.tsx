'use client';

import { useEffect, useRef, ReactNode } from 'react';

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
        if (entry.isIntersecting) el.classList.add('section-visible');
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className="py-[4.5rem] opacity-0 translate-y-8 transition-all duration-[0.65s] ease-out max-sm:py-14 section-anim"
    >
      <div className="max-w-[900px] mx-auto px-8 max-sm:px-5">
        <div className="flex items-center gap-5 mb-9">
          <span
            className="font-mono text-[0.68rem] tracking-[0.14em] flex-shrink-0"
            style={{ color: 'var(--neon-green)' }}
          >
            {number}
          </span>
          <h2
            className="text-[clamp(1.4rem,3vw,1.75rem)] font-bold tracking-tight flex-shrink-0"
            style={{ color: 'var(--clr-text)' }}
          >
            {title}
          </h2>
          <div
            className="flex-1 h-px min-w-[40px]"
            style={{ background: 'linear-gradient(to right, var(--accent-1), transparent)' }}
          />
        </div>
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </section>
  );
}
