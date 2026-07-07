'use client';

import Section from './Section';
import { resume } from '@/data/resume';
import { MapPin, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/context/ThemeContext';

export default function Experience() {
  const { theme } = useTheme();
  return (
    <Section id="experience" number="03" title="Experience">
      <div className="flex flex-col">
        {resume.experience.map((exp, i) => (
          <div key={i} className="flex gap-6">
            {/* Rail */}
            <div className="flex flex-col items-center flex-shrink-0 pt-7 max-sm:hidden">
              <div
                className="w-[10px] h-[10px] rounded-full flex-shrink-0"
                style={{
                  background: 'var(--neon-green)',
                  boxShadow: '0 0 8px var(--neon-green), 0 0 16px var(--glow-green)',
                }}
              />
              {i < resume.experience.length - 1 && (
                <div
                  className="w-px flex-1 min-h-8 mt-1"
                  style={{ background: 'linear-gradient(to bottom, var(--accent-1), transparent)' }}
                />
              )}
            </div>

            {/* Card */}
            <Card
              className="flex-1 mb-5 p-6 flex flex-col gap-4 relative transition-all duration-[0.25s] ease-out transform-gpu cursor-default rounded-[10px] ring-0 max-sm:mb-3"
              style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--neon-green)';
                el.style.boxShadow = '0 0 20px var(--glow-green), 0 20px 40px rgba(0,0,0,0.5)';
                el.style.transform = 'perspective(800px) rotateX(2deg) translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--clr-border)';
                el.style.boxShadow = '';
                el.style.transform = '';
              }}
            >
              <div className="flex justify-between gap-4 flex-wrap max-sm:flex-col">
                <div>
                  <h3 className="text-[1.05rem] font-bold tracking-[-0.01em]" style={{ color: 'var(--clr-text)' }}>{exp.role}</h3>
                  <p className="text-[0.85rem] mt-[0.2rem] font-medium font-mono" style={{ color: 'var(--clr-secondary)' }}>{exp.company}</p>
                </div>
                <div className="flex flex-col items-end gap-[0.35rem] max-sm:items-start">
                  <span className="flex items-center gap-[0.35rem] font-mono text-[0.63rem] tracking-[0.06em]" style={{ color: 'var(--clr-muted)' }}>
                    <Calendar size={11} />{exp.duration}
                  </span>
                  <span className="flex items-center gap-[0.35rem] font-mono text-[0.63rem] tracking-[0.06em]" style={{ color: 'var(--clr-muted)' }}>
                    <MapPin size={11} />{exp.location}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-[0.4rem]">
                {exp.stack.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="font-mono text-[0.62rem] tracking-[0.04em] h-auto px-[0.6rem] py-[0.2rem] rounded-[4px]"
                    style={{ background: 'var(--clr-surface-2)', borderColor: 'var(--glow-green)', color: 'var(--neon-green)' }}
                  >
                    {t}
                  </Badge>
                ))}
              </div>

              <ul className="list-none flex flex-col gap-2">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-[0.83rem] leading-[1.65] pl-[1.1rem] relative" style={{ color: 'var(--clr-secondary)' }}>
                    <span className="absolute left-0 font-bold" style={{ color: 'var(--neon-green)' }}>›</span>
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}
