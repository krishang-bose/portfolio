'use client';

import { resume } from '@/data/resume';
import PixelGlobe from './PixelGlobe';
import { Mail, ArrowDown, ExternalLink } from 'lucide-react';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { BlurFade } from '@/components/ui/blur-fade';
import { buttonVariants } from '@/components/ui/button';

function GithubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const ROLES = [
  'Full-Stack Developer',
  'AI / LLM Builder',
  'Competitive Programmer',
  'Quantum Researcher',
];

export default function Hero() {
  const { name, contact } = resume;

  return (
    <section
      className="relative min-h-screen flex items-center justify-between gap-8 px-[6%] py-20 overflow-hidden bg-transparent max-[900px]:flex-col max-[900px]:justify-center max-[900px]:items-start max-[900px]:px-6 max-[900px]:gap-12"
      id="hero"
    >
      {/* Retro perspective grid */}
      <div className="retro-grid" aria-hidden="true" />

      {/* Left: Text content */}
      <div className="relative z-[2] flex flex-col gap-[1.35rem] max-w-[560px] flex-shrink-0">

        {/* "Available" badge — Magic UI AnimatedGradientText */}
        <BlurFade delay={0} inView>
          <div
            className="inline-flex items-center gap-[0.55rem] font-mono text-[0.68rem] tracking-[0.12em] uppercase w-fit px-3 py-1 rounded-full border"
            style={{ borderColor: 'var(--clr-border-hi)', background: 'var(--clr-surface)' }}
          >
            <span
              className="w-[7px] h-[7px] rounded-full flex-shrink-0 animate-[dot-pulse_2s_ease-in-out_infinite]"
              style={{ background: 'var(--badge-color)' }}
            />
            <span
              className="font-mono text-[0.68rem] tracking-[0.12em] uppercase animate-[gradient_4s_linear_infinite] bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(90deg, var(--neon-green), var(--neon-cyan), var(--neon-green))',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Available for opportunities
            </span>
          </div>
        </BlurFade>

        {/* Name — VideoText with ocean fill */}
        <BlurFade delay={0.1} inView>
          <h1
            className="text-[clamp(3rem,6vw,5.5rem)] font-extrabold tracking-[-0.03em] leading-none"
            style={{ color: 'var(--clr-text)' }}>
            {name}
          </h1>
        </BlurFade>

        {/* Role typewriter — Magic UI TypingAnimation */}
        <BlurFade delay={0.2} inView>
          <div className="flex items-baseline gap-[0.4rem] min-h-8 flex-wrap">
            <span className="text-[clamp(0.95rem,2vw,1.2rem)] font-normal" style={{ color: 'var(--clr-secondary)' }}>
              I&apos;m a{' '}
            </span>
            <TypingAnimation
              words={ROLES}
              loop
              typeSpeed={60}
              deleteSpeed={30}
              pauseDelay={2200}
              showCursor
              cursorStyle="underscore"
              className="text-[clamp(0.95rem,2vw,1.2rem)] font-bold tracking-[-0.01em]"
              style={{ color: 'var(--role-color)' }}
            />
          </div>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <p className="text-[0.82rem] font-mono tracking-[0.04em]" style={{ color: 'var(--clr-muted)' }}>
            B.Tech CSE (Quantum Computing) · Bennett University · Merit Scholar
          </p>
        </BlurFade>

        {/* Contact pills */}
        <BlurFade delay={0.4} inView>
          <div className="flex flex-wrap gap-2">
            {[
              { href: `mailto:${contact.email}`, icon: <Mail size={12} />, label: contact.email },
              { href: contact.github.url, icon: <GithubIcon size={12} />, label: 'GitHub' },
              { href: contact.linkedin.url, icon: <LinkedinIcon size={12} />, label: 'LinkedIn' },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-[0.4rem] px-[0.8rem] py-[0.35rem] font-mono text-[0.66rem] tracking-[0.05em] no-underline rounded-[6px] border transition-all duration-200 hover:shadow-[0_0_12px_var(--glow-green)]"
                style={{
                  color: 'var(--clr-secondary)',
                  background: 'var(--clr-surface)',
                  borderColor: 'var(--clr-border-hi)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--neon-green)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--neon-green)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--clr-secondary)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-border-hi)';
                }}
              >
                {icon}
                <span className="max-sm:hidden">{label}</span>
              </a>
            ))}
          </div>
        </BlurFade>

        {/* CTAs — shadcn buttonVariants on <a> tags */}
        <BlurFade delay={0.5} inView>
          <div className="flex gap-3 flex-wrap">
            <a
              href="#projects"
              className={buttonVariants({ variant: 'default' }) + ' gap-2 font-mono text-[0.82rem] tracking-[0.04em] font-bold text-white border-none transition-all duration-200 hover:-translate-y-0.5 cursor-none no-underline px-5 py-2 h-auto'}
              style={{ background: 'var(--accent-1)', boxShadow: '0 0 16px var(--glow-green)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent-2)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px var(--accent-1), 0 8px 24px var(--glow-green)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent-1)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px var(--glow-green)';
              }}
            >
              View Projects
              <ExternalLink size={14} />
            </a>
            <a
              href="#contact"
              className={buttonVariants({ variant: 'outline' }) + ' font-mono text-[0.82rem] tracking-[0.04em] font-semibold bg-transparent transition-all duration-200 hover:-translate-y-0.5 cursor-none no-underline px-5 py-2 h-auto'}
              style={{ color: 'var(--clr-text)', borderColor: 'var(--clr-border-hi)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--neon-cyan)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--neon-cyan)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px var(--glow-cyan)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--clr-text)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--clr-border-hi)';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              Get in Touch
            </a>
          </div>
        </BlurFade>
      </div>

      {/* Right: Globe */}
      <BlurFade delay={0.3} inView className="relative flex-shrink-0 flex items-center justify-center z-[1] max-[900px]:self-center max-[900px]:opacity-75 max-sm:hidden">
        <div
          className="absolute w-[480px] h-[480px] rounded-full pointer-events-none blur-[20px]"
          style={{ background: 'radial-gradient(circle, var(--glow-green) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <PixelGlobe size={550} />
      </BlurFade>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[0.4rem] font-mono text-[0.58rem] tracking-[0.2em] uppercase z-[3]"
        style={{ color: 'var(--clr-muted)' }}
      >
        <span>scroll</span>
        <ArrowDown size={13} className="animate-[bounce-y_1.5s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
