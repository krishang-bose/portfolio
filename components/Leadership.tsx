'use client';

import Section from './Section';
import { resume } from '@/data/resume';
import { Users, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Leadership() {
  return (
    <Section id="leadership" number="07" title="Leadership">
      <div className="grid grid-cols-2 gap-[0.85rem] max-sm:grid-cols-1">
        {resume.leadership.map((l, i) => (
          <Card
            key={i}
            className="relative p-6 flex flex-col gap-[0.65rem] transition-all duration-[0.25s] cursor-default rounded-[10px] ring-0"
            style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--neon-magenta)';
              el.style.boxShadow = '0 0 20px var(--glow-magenta), 0 20px 40px rgba(0,0,0,0.5)';
              el.style.transform = 'perspective(700px) rotateX(2deg) rotateY(1deg) translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--clr-border)';
              el.style.boxShadow = '';
              el.style.transform = '';
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className="flex items-center justify-center w-[34px] h-[34px] rounded-[6px] border flex-shrink-0"
                style={{ background: 'var(--clr-surface-2)', borderColor: 'var(--glow-green)', color: 'var(--neon-magenta)' }}
              >
                <Users size={16} />
              </span>
              <span className="flex items-center gap-[0.3rem] font-mono text-[0.62rem] tracking-[0.06em]" style={{ color: 'var(--clr-muted)' }}>
                <Calendar size={11} />{l.duration}
              </span>
            </div>
            <h3 className="text-[1rem] font-bold tracking-[-0.01em]" style={{ color: 'var(--clr-text)' }}>{l.role}</h3>
            <p className="text-[0.78rem] font-semibold font-mono" style={{ color: 'var(--clr-secondary)' }}>{l.org}</p>
            <p className="text-[0.8rem] leading-[1.65]" style={{ color: 'var(--clr-secondary)' }}>{l.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
