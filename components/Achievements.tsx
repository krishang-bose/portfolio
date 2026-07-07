'use client';

import Section from './Section';
import { resume } from '@/data/resume';
import { Trophy, Medal, Code2, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ICONS = [Trophy, Trophy, Medal, Code2];

export default function Achievements() {
  return (
    <Section id="achievements" number="05" title="Achievements">
      <div className="flex flex-col gap-[0.6rem]">
        {resume.achievements.map((a, i) => {
          const Icon = ICONS[i] ?? Star;
          return (
            <Card
              key={i}
              className="flex items-start gap-4 px-[1.4rem] py-[1.15rem] rounded-[8px] ring-0 relative transition-all duration-[0.25s] cursor-default max-sm:px-4 max-sm:py-[0.9rem]"
              style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--accent-2)';
                el.style.boxShadow = '0 0 16px var(--glow-green), 0 16px 32px rgba(0,0,0,0.5)';
                el.style.transform = 'perspective(800px) rotateX(2deg) translateX(4px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--clr-border)';
                el.style.boxShadow = '';
                el.style.transform = '';
              }}
            >
              <span
                className="flex items-center justify-center w-[34px] h-[34px] rounded-[6px] border flex-shrink-0"
                style={{ background: 'var(--clr-surface-2)', borderColor: 'var(--glow-green)', color: 'var(--accent-2)' }}
              >
                <Icon size={16} />
              </span>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  {a.leetcodeUrl ? (
                    <a
                      href={a.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.88rem] font-semibold tracking-[-0.01em] underline underline-offset-[3px]"
                      style={{ color: 'var(--clr-text)' }}
                    >
                      {a.title}
                    </a>
                  ) : (
                    <span className="text-[0.88rem] font-semibold tracking-[-0.01em]" style={{ color: 'var(--clr-text)' }}>
                      {a.title}
                    </span>
                  )}
                  {a.year && (
                    <Badge
                      variant="outline"
                      className="font-mono text-[0.62rem] tracking-[0.09em] h-auto px-2 py-[0.12rem] rounded-[3px] flex-shrink-0"
                      style={{ borderColor: 'var(--glow-green)', color: 'var(--accent-2)', background: 'var(--clr-surface-2)' }}
                    >
                      {a.year}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[0.77rem]" style={{ color: 'var(--clr-secondary)' }}>{a.detail}</span>
                  <span className="text-[0.7rem]" style={{ color: 'var(--clr-muted)' }}>·</span>
                  <span className="font-mono text-[0.63rem] tracking-[0.05em]" style={{ color: 'var(--clr-muted)' }}>{a.venue}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
