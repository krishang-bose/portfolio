'use client';

import Section from './Section';
import { BlurFade } from '@/components/ui/blur-fade';

const STATS = [
  { value: '8.9', label: 'CGPA / 10', sub: 'Merit Scholar' },
  { value: '3k+', label: 'Users Reached', sub: 'Across projects' },
  { value: '4+', label: 'Projects Shipped', sub: 'Production-grade' },
  { value: '2025', label: 'Industry Intern', sub: 'Eleven Studios' },
];

const INTERESTS = [
  { emoji: '♟️', label: 'Chess' },
  { emoji: '🏀', label: 'Basketball' },
  { emoji: '🎵', label: 'Music' },
  { emoji: '📚', label: 'Reading' },
  { emoji: '🎮', label: 'Gaming' },
  { emoji: '🧠', label: 'Problem Solving' },
  { emoji: '⚡', label: 'Competitive Programming' },
  { emoji: '🔢', label: 'DSA' },
];

export default function About() {
  return (
    <Section id="about" number="09" title="About Me">

      {/* Merged bio card */}
      <BlurFade delay={0.05} inView>
        <div
          className="rounded-[12px] p-6 mb-6 border"
          style={{ background: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}
        >
          <p
            className="text-[0.92rem] leading-[1.9] tracking-[0.01em]"
            style={{ color: 'var(--clr-secondary)' }}
          >
            I&apos;m Krishang — a final year CS student at{' '}
            <span style={{ color: 'var(--neon-green)', fontWeight: 600 }}>Bennett University</span>{' '}
            who is genuinely obsessed with{' '}
            <span style={{ color: 'var(--neon-green)', fontWeight: 600 }}>problem solving</span>.
            Competitive programming and DSA aren&apos;t a grind for me, they&apos;re the most fun
            I have in front of a screen. I treat every hard problem like a chess game: you study the
            position, find the right move, and when it clicks it&apos;s one of the best feelings in
            the world.{' '}
            <span style={{ color: 'var(--neon-cyan)', fontWeight: 600 }}>Chess</span> is probably
            where that mindset came from, I&apos;ve been playing since I was a kid and it taught
            me that losing is just data. Off the screen, I&apos;m on the{' '}
            <span style={{ color: 'var(--neon-cyan)', fontWeight: 600 }}>basketball court</span>{' '}
            as much as I can be, nothing clears your head like a good run. Music is always playing
            in the background, whatever I&apos;m doing.
          </p>

        </div>
      </BlurFade>

      {/* Stats row */}
      <BlurFade delay={0.1} inView>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-[10px] p-4 flex flex-col gap-[0.2rem] border transition-all duration-200"
              style={{ background: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--neon-green)';
                el.style.boxShadow = '0 0 16px var(--glow-green)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--clr-border)';
                el.style.boxShadow = '';
              }}
            >
              <span
                className="font-mono text-[1.6rem] font-bold tracking-[-0.03em] leading-none"
                style={{ color: 'var(--neon-green)', textShadow: '0 0 12px var(--glow-green)' }}
              >
                {s.value}
              </span>
              <span
                className="font-semibold text-[0.78rem] leading-tight mt-1"
                style={{ color: 'var(--clr-text)' }}
              >
                {s.label}
              </span>
              <span
                className="font-mono text-[0.62rem] tracking-[0.06em]"
                style={{ color: 'var(--clr-muted)' }}
              >
                {s.sub}
              </span>
            </div>
          ))}
        </div>
      </BlurFade>

      {/* Interests */}
      <BlurFade delay={0.15} inView>
        <div
          className="rounded-[12px] p-5 border"
          style={{ background: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}
        >
          <p
            className="font-mono text-[0.63rem] tracking-[0.14em] uppercase mb-4"
            style={{ color: 'var(--clr-muted)' }}
          >
            Interests &amp; hobbies
          </p>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border text-[0.78rem] font-medium transition-all duration-200 cursor-default"
                style={{
                  background: 'var(--clr-surface-2)',
                  borderColor: 'var(--clr-border)',
                  color: 'var(--clr-secondary)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--neon-cyan)';
                  el.style.color = 'var(--neon-cyan)';
                  el.style.boxShadow = '0 0 10px var(--glow-cyan)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--clr-border)';
                  el.style.color = 'var(--clr-secondary)';
                  el.style.boxShadow = '';
                }}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </BlurFade>

    </Section>
  );
}
