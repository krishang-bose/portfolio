import Hero from '@/components/Hero';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Research from '@/components/Research';
import Achievements from '@/components/Achievements';
import Projects from '@/components/Projects';
import Leadership from '@/components/Leadership';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Education />
      <Projects />
      <Research />
      <Skills />
      <Experience />
      <Achievements />
      <Leadership />
      <Contact />
    </main>
  );
}
