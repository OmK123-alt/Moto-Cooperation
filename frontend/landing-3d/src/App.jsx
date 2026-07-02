import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import Loader from './components/Loader.jsx';
import { initScrollScenes } from './animations/scrollScenes.js';
import { useReducedMotion } from './hooks/useReducedMotion.js';

function FeatureSection({ id, eyebrow, title, copy }) {
  return (
    <section
      id={id}
      className="reveal-section min-h-[88svh] bg-carbon px-5 py-28 text-white md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-7xl border-t border-white/10 pt-10">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.36em] text-blood">
          {eyebrow}
        </p>
        <h2 className="max-w-4xl font-display text-5xl font-black uppercase leading-[0.88] tracking-[0.08em] md:text-8xl">
          {title}
        </h2>
        <p className="mt-8 max-w-xl text-base leading-7 text-white/58 md:text-lg">
          {copy}
        </p>
      </div>
    </section>
  );
}

export default function App() {
  const scrollProgress = useRef(0);
  const reducedMotion = useReducedMotion();
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('is-3d-landing');
    const lenis = new Lenis({
      duration: reducedMotion ? 0 : 1.22,
      smoothWheel: !reducedMotion,
      wheelMultiplier: 0.88,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    lenis.on('scroll', ({ progress }) => {
      scrollProgress.current = progress;
    });

    const cleanupScenes = initScrollScenes({ reducedMotion });
    setBooted(true);

    return () => {
      cleanupScenes();
      lenis.destroy();
      document.documentElement.classList.remove('is-3d-landing');
    };
  }, [reducedMotion]);

  return (
    <main className="min-h-screen overflow-x-clip bg-carbon font-body text-white">
      {!booted && <Loader />}
      <Navbar />
      <Hero scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
      <FeatureSection
        id="about"
        eyebrow="About"
        title="A private showroom for velocity culture."
        copy="Moto Cooperation brings together precision builds, curated meets, and a performance-first community with the restraint of a luxury marque."
      />
      <FeatureSection
        id="events"
        eyebrow="Events"
        title="Night meets with cinematic detail."
        copy="Every gathering is staged like a launch moment: light, sound, movement, and machines built to be remembered."
      />
      <FeatureSection
        id="builds"
        eyebrow="Builds"
        title="Commissioned machines. No ordinary metal."
        copy="A rotating gallery of member builds, from track-focused weapons to sculptural weekend icons."
      />
      <FeatureSection
        id="shop"
        eyebrow="Shop"
        title="Minimal gear for maximal presence."
        copy="Premium drops, limited runs, and track-night essentials designed around the Moto Cooperation visual system."
      />
      <FeatureSection
        id="contact"
        eyebrow="Contact"
        title="Enter the circle."
        copy="For partnerships, events, and curated builds, Moto Cooperation keeps the signal clean and the standards high."
      />
    </main>
  );
}
