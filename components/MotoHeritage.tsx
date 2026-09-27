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

const achievements = [
  { year: '2019', title: 'World Superbike Champion', rider: 'M. Rosetti', num: '1st' },
  { year: '2020', title: 'Manufacturers Championship', rider: 'VELOX Racing', num: '1st' },
  { year: '2021', title: 'Isle of Man TT Winner', rider: 'K. Walsh', num: '1st' },
  { year: '2022', title: 'Endurance 24H Spa', rider: 'VELOX Factory', num: '1st' },
  { year: '2023', title: 'MotoGP Constructor Award', rider: 'VELOX Moto', num: '1st' },
  { year: '2024', title: 'Nürburgring Lap Record', rider: 'Production Class', num: '1st' },
];

export default function MotoHeritage() {
  return (
    <section id="heritage" className="relative bg-[#070000] py-14 md:py-40 overflow-hidden">
      <SectionBackground theme="black" speed={0.25} />
      <span
        className="absolute right-0 top-0 font-display font-light text-white/[0.02] pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(160px, 25vw, 320px)' }}
        aria-hidden
      >03</span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">
        <Reveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[10px] text-red-500/60 tracking-[0.5em] uppercase font-mono">03 — Heritage</span>
            <div className="flex-1 h-px bg-gradient-to-r from-red-600/30 to-transparent" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start mb-20">
          <Reveal delay={80}>
            <h2
              className="font-display font-light text-white leading-[0.9]"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              Winning<br />
              <em className="text-red-500/80 not-italic">is heritage.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-white/30 text-sm leading-8 tracking-wide">
              Decades of racing DNA flow through every component of the RS1. Six consecutive years of championship victories. The road bike inherits everything the racers learned at the limit.
            </p>
          </Reveal>
        </div>

        <div className="space-y-0">
          {achievements.map(({ year, title, rider, num }, i) => (
            <Reveal key={year + title} delay={i * 60}>
              <div className="grid grid-cols-[5rem_1fr_auto] md:grid-cols-[6rem_1fr_auto_6rem] items-center py-5 border-b border-white/[0.05] group hover:border-red-600/25 transition-colors duration-300 gap-4 md:gap-8">
                <span className="text-[11px] text-white/25 tracking-[0.3em] font-mono group-hover:text-red-500/50 transition-colors">{year}</span>
                <div>
                  <p className="text-white/75 font-sans font-light text-sm tracking-wide group-hover:text-white transition-colors">{title}</p>
                  <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase font-mono mt-0.5">{rider}</p>
                </div>
                <span className="font-display font-light text-red-500/70 text-2xl group-hover:text-red-400 transition-colors">{num}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
