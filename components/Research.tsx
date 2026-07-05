'use client';

import Section from './Section';
import { resume } from '@/data/resume';
import { FlaskConical, ExternalLink, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Research() {
  return (
    <Section id="research" number="04" title="Research">
      {resume.research.map((r, i) => (
        <Card
          key={i}
          className="relative flex flex-col gap-4 transition-all duration-[0.25s] rounded-[10px] ring-0 cursor-default group max-sm:p-5"
          style={{
            background: 'var(--clr-surface)',
            border: '1px solid var(--clr-border)',
            padding: '1.75rem 1.75rem 1.75rem 2.25rem',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'var(--neon-green)';
            el.style.boxShadow = '0 0 24px var(--glow-green), 0 24px 48px rgba(0,0,0,0.5)';
            el.style.transform = 'perspective(800px) rotateX(2deg) translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'var(--clr-border)';
            el.style.boxShadow = '';
            el.style.transform = '';
          }}
        >
          {/* Left accent bar */}
          <div
            className="absolute top-0 left-0 w-[2px] h-full group-hover:shadow-[0_0_12px_var(--neon-green)]"
            style={{ background: 'linear-gradient(to bottom, var(--neon-green), var(--neon-cyan))' }}
          />

          <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:gap-2">
            <div
              className="flex items-center justify-center w-[38px] h-[38px] rounded-[8px] border"
              style={{ background: 'var(--clr-surface-2)', borderColor: 'var(--glow-green)', color: 'var(--neon-green)' }}
            >
              <FlaskConical size={18} />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.65rem] tracking-[0.1em]" style={{ color: 'var(--clr-muted)' }}>{r.year}</span>
              <Badge
                variant="outline"
                className="inline-flex items-center gap-[0.3rem] font-mono text-[0.6rem] tracking-[0.07em] h-auto px-[0.6rem] py-[0.18rem] rounded-[3px]"
                style={{ background: 'var(--clr-surface-2)', borderColor: 'var(--glow-green)', color: 'var(--neon-green)' }}
              >
                <BookOpen size={10} />{r.status}
              </Badge>
            </div>
          </div>

          <h3 className="text-[1.05rem] font-bold tracking-[-0.01em] leading-[1.4]" style={{ color: 'var(--clr-text)' }}>{r.title}</h3>
          <p className="font-mono text-[0.65rem] tracking-[0.06em]" style={{ color: 'var(--clr-muted)' }}>{r.affiliation}</p>

          <ul className="list-none flex flex-col gap-2">
            {r.bullets.map((b, j) => (
              <li key={j} className="text-[0.83rem] leading-[1.65] pl-[1.1rem] relative" style={{ color: 'var(--clr-secondary)' }}>
                <span className="absolute left-0 font-bold" style={{ color: 'var(--neon-green)' }}>›</span>
                {b}
              </li>
            ))}
          </ul>

          <a
            href={r.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[0.4rem] font-mono text-[0.68rem] tracking-[0.05em] no-underline w-fit px-[0.75rem] py-[0.28rem] rounded-[4px] border transition-all duration-200"
            style={{ color: 'var(--neon-green)', borderColor: 'var(--glow-green)', background: 'var(--clr-surface-2)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--neon-green)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px var(--glow-green)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--glow-green)';
              (e.currentTarget as HTMLElement).style.boxShadow = '';
            }}
          >
            <ExternalLink size={12} />{r.link.label}
          </a>
        </Card>
      ))}
    </Section>
  );
}
