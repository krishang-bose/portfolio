import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Dock from '@/components/Dock';
import SmoothCursor from '@/components/SmoothCursor';
import ScrollProgress from '@/components/ScrollProgress';
import StarField from '@/components/StarField';

export const metadata: Metadata = {
  title: 'Krishang Bose — CS Engineer & AI Builder',
  description:
    'Portfolio of Krishang Bose — B.Tech CSE (Quantum Computing) at Bennett University. Full-stack developer, AI/LLM builder, competitive programmer.',
  keywords: ['Krishang Bose', 'portfolio', 'software engineer', 'full stack', 'AI', 'LLM', 'Next.js'],
  authors: [{ name: 'Krishang Bose', url: 'https://github.com/krishang-bose' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SmoothCursor />
          <ScrollProgress />
          <StarField />
          <Dock />
          {children}
          <footer className="footer">
            <p>Krishang Bose &mdash; {new Date().getFullYear()}</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
