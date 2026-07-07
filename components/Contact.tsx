'use client';

import Section from './Section';
import { resume } from '@/data/resume';
import { Mail, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
      <div className="text-center px-4 pb-12 flex flex-col items-center gap-4">
        <h3
          className="font-extrabold tracking-[-0.02em]"
          style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', color: 'var(--clr-text)' }}
        >
          Let&apos;s Build{' '}
          <span style={{ color: 'var(--neon-green)', textShadow: '0 0 20px var(--glow-green)' }}>
            Something Great
          </span>
        </h3>
        <p className="text-[0.88rem] max-w-[440px] leading-[1.7] font-mono" style={{ color: 'var(--clr-secondary)' }}>
          Open to internships, collaborations, and interesting projects. Drop a message!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {[
          { href: `mailto:${contact.email}`, icon: <Mail size={20} />, label: 'Email', value: contact.email },
          { href: contact.linkedin.url, icon: <LinkedinIcon size={20} />, label: 'LinkedIn', value: contact.linkedin.label },
        ].map(({ href, icon, label, value }) => (
          <Card
            key={label}
            className="group flex items-center gap-4 px-[1.4rem] py-[1.2rem] rounded-[8px] ring-0 relative transition-all duration-[0.25s] cursor-pointer"
            style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', color: 'var(--clr-text)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--neon-green)';
              el.style.boxShadow = '0 0 20px var(--glow-green), 0 16px 32px rgba(0,0,0,0.5)';
              el.style.transform = 'perspective(600px) rotateX(4deg) translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--clr-border)';
              el.style.boxShadow = '';
              el.style.transform = '';
            }}
            onClick={() => window.open(href, href.startsWith('mailto') ? '_self' : '_blank')}
          >
            <span
              className="flex items-center justify-center w-[42px] h-[42px] rounded-[8px] border flex-shrink-0"
              style={{ background: 'var(--clr-surface-2)', borderColor: 'var(--glow-green)', color: 'var(--neon-green)' }}
            >
              {icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase mb-[0.2rem]" style={{ color: 'var(--clr-muted)' }}>{label}</p>
              <p className="text-[0.78rem] font-medium truncate" style={{ color: 'var(--clr-text)' }}>{value}</p>
            </div>
            <ExternalLink
              size={14}
              className="flex-shrink-0 transition-all duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              style={{ color: 'var(--clr-muted)' }}
            />
          </Card>
        ))}
      </div>
    </Section>
  );
}
