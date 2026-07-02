import Buttons from './Buttons.jsx';
import CarScene from './CarScene.jsx';
import SceneErrorBoundary from './SceneErrorBoundary.jsx';

export default function Hero({ scrollProgress, reducedMotion }) {
  return (
    <section id="hero" className="hero-shell relative h-[100svh] min-h-[640px] overflow-hidden bg-carbon opacity-0">
      <div className="absolute inset-0">
        <SceneErrorBoundary>
          <CarScene scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
        </SceneErrorBoundary>
      </div>

      <div className="showroom-gradient pointer-events-none absolute inset-0" />
      <div className="scanline pointer-events-none absolute inset-0" />
      <div className="volumetric-fog pointer-events-none absolute left-1/2 top-[58%] h-44 w-[72vw] -translate-x-1/2 -translate-y-1/2" />

      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-5 pt-16 text-center">
        <h1 className="hero-title font-display text-[21vw] font-black uppercase leading-[0.74] tracking-[0.06em] text-white md:text-[14.4vw]">
          <span className="overflow-hidden">MOTO</span>
          <span className="overflow-hidden text-blood">COOPERATION</span>
        </h1>
        <p className="hero-copy mt-8 max-w-2xl text-xs font-bold uppercase tracking-[0.34em] text-white/54 opacity-0 md:text-sm">
          Premium builds. Night meets. Motorsport culture.
        </p>
        <div className="pointer-events-auto">
          <Buttons />
        </div>
      </div>
    </section>
  );
}
