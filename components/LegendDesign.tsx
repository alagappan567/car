'use client';

import { useEffect, useRef, useState } from 'react';
import SectionBackground from '@/components/ui/SectionBackground';

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const features = [
  { num: '01', title: 'Carbon Monocoque', body: 'The entire passenger cell is formed from a single piece of aerospace-grade carbon fibre — lighter than a motorcycle, stiffer than a racing car.' },
  { num: '02', title: 'Dihedral Doors', body: 'Scissor-action doors pivot on a forward hinge, sweeping upward and outward to reveal a cockpit-style interior with panoramic sightlines.' },
  { num: '03', title: 'Bespoke Interior', body: 'Every surface is hand-stitched by master craftsmen. Clients choose from 47 leather hues, 12 Alcantara weaves, and unlimited personalisation options.' },
  { num: '04', title: 'Titanium Accents', body: 'Exposed titanium hardware throughout — from the pedal box to the centre console release — fuses functionality with sculptural beauty.' },
];

export default function LegendDesign() {
  const { ref, visible } = useReveal();

  return (
    <section id="design" className="relative bg-black py-16 px-5 md:px-14 overflow-hidden">
      <SectionBackground theme="black" speed={0.25} />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`mb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <p className="text-[10px] text-purple-400/60 tracking-[0.6em] uppercase mb-4 font-mono">Design</p>
          <h2 className="font-display font-light text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Art Engineered<br />
            <span style={{ color: '#a855f7' }}>to Move</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {features.map(({ num, title, body }, i) => (
            <div
              key={num}
              className={`border-t border-purple-900/25 pt-8 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <p className="text-[10px] text-purple-400/40 tracking-[0.4em] uppercase mb-3 font-mono">{num}</p>
              <h3 className="font-display font-light text-xl text-white mb-3">{title}</h3>
              <p className="text-white/35 text-sm leading-7 tracking-wide">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
