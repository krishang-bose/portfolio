'use client';

import Section from './Section';
import { resume } from '@/data/resume';
import { MapPin, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Education() {
  return (
    <Section id="education" number="01" title="Education">
      <div className="flex flex-col">
        {resume.education.map((edu, i) => (
          <div key={i} className="flex gap-6">
            {/* Rail */}
            <div className="flex flex-col items-center flex-shrink-0 pt-7 max-sm:hidden">
              <div
                className="w-[10px] h-[10px] rounded-full flex-shrink-0"
                style={{
                  background: 'var(--neon-cyan)',
                  boxShadow: '0 0 8px var(--neon-cyan), 0 0 16px var(--glow-cyan)',
                }}
              />
              {i < resume.education.length - 1 && (
                <div
                  className="w-px flex-1 min-h-8 mt-1"
                  style={{ background: 'linear-gradient(to bottom, var(--accent-1), transparent)' }}
                />
              )}
            </div>

            {/* Card */}
            <Card
              className="flex-1 mb-5 p-6 flex flex-col gap-4 transition-all duration-[0.25s] ease-out transform-gpu cursor-default rounded-[10px] ring-0 max-sm:mb-3"
              style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--neon-cyan)';
                el.style.boxShadow = '0 0 20px var(--glow-cyan), 0 20px 40px rgba(0,0,0,0.5)';
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
                  <h3 className="text-[1.05rem] font-bold tracking-[-0.01em]" style={{ color: 'var(--clr-text)' }}>
                    {edu.institution}
                  </h3>
                  <p className="text-[0.82rem] mt-1 leading-[1.5]" style={{ color: 'var(--clr-secondary)' }}>
                    {edu.degree}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-[0.35rem] max-sm:items-start">
                  <span className="flex items-center gap-[0.35rem] font-mono text-[0.63rem] tracking-[0.06em]" style={{ color: 'var(--clr-muted)' }}>
                    <Calendar size={11} />{edu.duration}
                  </span>
                  <span className="flex items-center gap-[0.35rem] font-mono text-[0.63rem] tracking-[0.06em]" style={{ color: 'var(--clr-muted)' }}>
                    <MapPin size={11} />{edu.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Badge
                  variant="outline"
                  className="font-mono text-[0.63rem] tracking-[0.07em] h-auto px-[0.65rem] py-[0.22rem] rounded-[4px]"
                  style={{ borderColor: 'var(--glow-green)', color: 'var(--neon-cyan)', background: 'var(--clr-surface-2)' }}
                >
                  {edu.badge}
                </Badge>
                <span className="font-mono text-[0.72rem]" style={{ color: 'var(--clr-secondary)' }}>
                  GPA&nbsp;<strong style={{ color: 'var(--neon-green)', textShadow: '0 0 8px var(--glow-green)' }}>{edu.cgpa}</strong>
                  {Number(edu.cgpa) <= 10 ? ' / 10' : '%'}
                </span>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}
