'use client';

import { useEffect, useRef, useState } from 'react';
import SectionBackground from '@/components/ui/SectionBackground';

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(28px)',
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

const systems = [
  { id: '01', title: 'Cornering ABS', desc: 'Lean-angle-sensitive ABS analyses 125 data points per second. Brake with confidence at any angle.' },
  { id: '02', title: 'Traction Control+', desc: 'Race-derived TC with 8 sensitivity levels. Reads throttle, lean angle, and wheel speed 100× per second.' },
  { id: '03', title: 'Launch Control', desc: 'MotoGP-spec launch system. Consistent sub-3-second 0–100 km/h every single launch.' },
  { id: '04', title: 'Quickshifter Pro', desc: 'Bi-directional quickshifter. Up and downshifts without the clutch at any RPM, any speed.' },
  { id: '05', title: 'Aerodynamic Wings', desc: 'Carbon fiber winglets generate 28 kg of downforce at 200 km/h. Stability without compromise.' },
  { id: '06', title: 'OTA Race Updates', desc: 'Engine maps, suspension settings, and safety calibrations delivered wirelessly overnight.' },
];

export default function MotoEngineering() {
  return (
    <section id="engineering" className="relative bg-[#050000] py-14 md:py-40 overflow-hidden">
      <SectionBackground theme="black" speed={0.3} />
      <span
        className="absolute -left-6 bottom-0 font-display font-light text-white/[0.02] pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(160px, 25vw, 320px)' }}
        aria-hidden
      >02</span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">
        <Reveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[10px] text-red-500/60 tracking-[0.5em] uppercase font-mono">02 — Engineering</span>
            <div className="flex-1 h-px bg-gradient-to-r from-red-600/30 to-transparent" />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="font-display font-light text-white leading-[0.9] mb-6"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            Track DNA.<br />
            <em className="text-white/40 not-italic">Road Legal.</em>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="text-white/30 text-sm leading-8 tracking-wide max-w-sm mb-20">
            Six race-derived systems working as one. The RS1 borrows directly from our MotoGP championship-winning programme.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.04]">
          {systems.map(({ id, title, desc }, i) => (
            <Reveal key={id} delay={i * 60}>
              <div className="bg-[#050000] p-8 md:p-10 group hover:bg-[#0c0000] transition-colors duration-500 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-mono text-red-600/40 text-sm shrink-0 mt-0.5">{id}</span>
                  <h3 className="text-white/85 font-sans font-light tracking-[0.15em] uppercase text-[12px]">{title}</h3>
                </div>
                <p className="text-white/28 text-sm leading-7 flex-1">{desc}</p>
                <div className="mt-5 h-px bg-gradient-to-r from-red-600/0 via-red-600/25 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
