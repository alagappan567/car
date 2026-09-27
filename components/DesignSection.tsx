'use client';

import { useEffect, useRef, useState } from 'react';
import SectionBackground from '@/components/ui/SectionBackground';

function Reveal({ children, delay = 0, dir = 'up', className = '' }: {
  children: React.ReactNode; delay?: number; dir?: 'up' | 'left' | 'right'; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  const from = dir === 'left' ? 'translateX(-36px)' : dir === 'right' ? 'translateX(36px)' : 'translateY(32px)';
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0, transform: v ? 'none' : from,
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const principles = [
  {
    num: '01',
    title: 'Active Aerodynamics',
    desc: 'Rear spoiler and front splitter adjust continuously. 220 lbs of downforce at speed.',
  },
  {
    num: '02',
    title: 'Carbon Fiber Body',
    desc: 'Full CFRP exterior panels cut weight by 40% vs. steel while doubling rigidity.',
  },
  {
    num: '03',
    title: 'Adaptive LED Matrix',
    desc: '1,024-pixel headlights carve darkness with surgical precision. Zero glare for oncoming drivers.',
  },
  {
    num: '04',
    title: 'Hand-stitched Interior',
    desc: 'Every surface touched by human hands. 47 hours of bespoke leather craftsmanship per vehicle.',
  },
];

export default function DesignSection() {
  return (
    <section id="design" className="relative bg-[#050505] py-14 md:py-40 overflow-hidden">
      <SectionBackground theme="black" speed={0.25} />
      {/* Decorative bg text */}
      <span
        className="absolute -left-6 bottom-0 font-display font-light text-white/[0.022] pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(160px, 25vw, 320px)' }}
        aria-hidden
      >
        03
      </span>

      {/* Diagonal accent line */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 60%, rgba(201,168,76,0.03) 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[10px] text-gold/60 tracking-[0.5em] uppercase font-sans">03 — Design</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
        </Reveal>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start mb-24">
          {/* Left: headline */}
          <div>
            <Reveal delay={80}>
              <h2
                className="font-display font-light text-white leading-[0.9] mb-8"
                style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
              >
                Sculpted<br />
                <em className="text-white/50 not-italic">by air.</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-white/40 text-sm leading-8 tracking-wide max-w-sm">
                Every curve serves a purpose. The GT-X began in a wind tunnel, not on a drawing board.
                Air shapes every surface — from the swept A-pillars to the Venturi-effect underbody.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <blockquote className="mt-10 pl-5 border-l border-gold/40">
                <p className="font-display font-light italic text-white/50 text-lg leading-relaxed">
                  &ldquo;Form is not the enemy of function — it is its highest expression.&rdquo;
                </p>
                <cite className="text-[10px] text-white/25 tracking-[0.3em] uppercase not-italic mt-3 block">
                  — Chief Designer, VELOX Studio
                </cite>
              </blockquote>
            </Reveal>
          </div>

          {/* Right: design stats */}
          <Reveal delay={120} dir="right">
            <div className="space-y-1">
              {[
                { label: 'Drag Coefficient', value: '0.24 Cd' },
                { label: 'Downforce', value: '220 lbs @ 150 mph' },
                { label: 'Underbody Coverage', value: '94%' },
                { label: 'Carbon Panels', value: '18 exterior panels' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-4 border-b border-white/[0.06] group">
                  <span className="text-[11px] text-white/35 tracking-[0.25em] uppercase">{label}</span>
                  <span className="font-display font-light text-white/80 text-lg">{value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Design principles grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/[0.05]">
          {principles.map(({ num, title, desc }, i) => (
            <Reveal key={num} delay={i * 80}>
              <div className="bg-[#050505] p-8 md:p-10 group hover:bg-[#0a0a0a] transition-colors duration-500 h-full">
                <div className="flex items-start gap-5">
                  <span className="font-display text-gold/25 font-light text-2xl mt-0.5 shrink-0">{num}</span>
                  <div>
                    <h3 className="text-white/90 font-sans font-light tracking-[0.15em] uppercase text-[13px] mb-3">
                      {title}
                    </h3>
                    <p className="text-white/35 text-sm leading-7">{desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
