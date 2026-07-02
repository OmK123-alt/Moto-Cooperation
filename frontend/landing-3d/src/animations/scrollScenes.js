import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollScenes({ reducedMotion = false } = {}) {
  if (reducedMotion) {
    return () => {};
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.hero-shell',
      { opacity: 0 },
      { opacity: 1, duration: 1.35, ease: 'power2.out' },
    );

    gsap.fromTo(
      '.hero-title span',
      { yPercent: 105, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.15,
        stagger: 0.13,
        delay: 0.32,
        ease: 'power4.out',
      },
    );

    gsap.fromTo(
      '.hero-copy, .hero-ctas',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 1.05, stagger: 0.12, ease: 'power3.out' },
    );

    gsap.to('.hero-title', {
      scale: 0.86,
      opacity: 0.44,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    gsap.utils.toArray('.reveal-section').forEach((section) => {
      gsap.fromTo(
        section.children,
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            end: 'top 38%',
            scrub: 0.8,
          },
        },
      );
    });
  });

  return () => ctx.revert();
}
