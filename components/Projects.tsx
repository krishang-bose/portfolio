'use client';

import Section from './Section';
import { resume } from '@/data/resume';
import { ExternalLink, Tag } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DARK_TAG_COLORS: Record<string, string> = {
  'Full Stack': '#5577cc',
  'AI': '#4466bb',
  'Hackathon Winner': '#6688dd',
  'Frontend': '#3355aa',
  'Backend': '#7799ee',
};

const LIGHT_TAG_COLORS: Record<string, string> = {
  'Full Stack': '#3355ee',
  'AI': '#7755cc',
  'Hackathon Winner': '#00b4d8',
  'Frontend': '#4466ff',
  'Backend': '#9966dd',
};

export default function Projects() {
  const { theme } = useTheme();
  const TAG_COLORS = theme === 'dark' ? DARK_TAG_COLORS : LIGHT_TAG_COLORS;

  return (
    <Section id="projects" number="06" title="Projects">
      <div className="grid grid-cols-2 gap-[0.85rem] max-[640px]:grid-cols-1">
        {resume.projects.map((p, i) => (
          <Card
            key={i}
            className={`relative p-[1.6rem] flex flex-col gap-4 transition-all duration-[0.25s] ease-out transform-gpu cursor-default rounded-[10px] ring-0 ${i === 0 ? 'col-span-2 max-[640px]:col-span-1' : ''}`}
            style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--neon-green)';
              el.style.boxShadow = '0 0 24px var(--glow-green), 0 24px 48px rgba(0,0,0,0.6)';
              el.style.transform = 'perspective(700px) rotateX(3deg) rotateY(-1deg) translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--clr-border)';
              el.style.boxShadow = '';
              el.style.transform = '';
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-[0.35rem]">
                {p.tags.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="inline-flex items-center gap-[0.3rem] font-mono text-[0.62rem] tracking-[0.05em] h-auto px-[0.55rem] py-[0.18rem] rounded-[3px]"
                    style={{
                      background: 'var(--clr-surface-2)',
                      borderColor: `color-mix(in srgb, ${TAG_COLORS[t] ?? TAG_COLORS['Full Stack']} 40%, transparent)`,
                      color: TAG_COLORS[t] ?? TAG_COLORS['Full Stack'],
                    }}
                  >
                    <Tag size={10} />{t}
                  </Badge>
                ))}
              </div>
              <Badge
                variant="outline"
                className="font-mono text-[0.65rem] tracking-[0.1em] h-auto px-2 py-[0.1rem] rounded-[3px] flex-shrink-0"
                style={{ borderColor: 'var(--clr-border)', color: 'var(--clr-muted)', background: 'transparent' }}
              >
                {p.year}
              </Badge>
            </div>

            <h3 className="text-[1.1rem] font-bold tracking-[-0.01em] leading-[1.3]" style={{ color: 'var(--clr-text)' }}>{p.name}</h3>

            <ul className="list-none flex flex-col gap-2 flex-1">
              {p.bullets.map((b, j) => (
                <li key={j} className="text-[0.81rem] leading-[1.65] pl-[1.1rem] relative" style={{ color: 'var(--clr-secondary)' }}>
                  <span className="absolute left-0 font-bold" style={{ color: 'var(--neon-green)' }}>›</span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-3 flex-wrap pt-3 border-t mt-auto" style={{ borderColor: 'var(--clr-border)' }}>
              <div className="flex flex-wrap gap-[0.35rem]">
                {p.stack.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="font-mono text-[0.6rem] tracking-[0.04em] h-auto px-[0.5rem] py-[0.18rem] rounded-[3px]"
                    style={{ background: 'var(--clr-surface-2)', borderColor: 'var(--glow-green)', color: 'var(--neon-cyan)' }}
                  >
                    {t}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[0.3rem] font-mono text-[0.65rem] tracking-[0.04em] px-[0.6rem] py-[0.22rem] rounded-[4px] border bg-transparent no-underline transition-all duration-200"
                    style={{ color: 'var(--clr-secondary)', borderColor: 'var(--clr-border-hi)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--neon-green)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--neon-green)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 8px var(--glow-green)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--clr-secondary)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-border-hi)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '';
                    }}
                  >
                    {l.label}<ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
