'use client';

import { useEffect, useRef, useState } from 'react';
import SectionBackground from '@/components/ui/SectionBackground';

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(28px)',
      transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function CTASection() {
  return (
    <section className="relative bg-[#000000] py-16 md:py-48 overflow-hidden">
      <SectionBackground theme="black" speed={0.4} />
      {/* Ghost headline in background */}
      <span
        className="absolute inset-0 flex items-center justify-center font-display font-light text-white/[0.025] pointer-events-none select-none text-center leading-none"
        style={{ fontSize: 'clamp(100px, 20vw, 260px)' }}
        aria-hidden
      >
        GT-X
      </span>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 md:px-14 text-center">
        <Reveal>
          <p className="text-[10px] text-gold/60 tracking-[0.6em] uppercase mb-8">
            Your Journey Begins Here
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2
            className="font-display font-light text-white leading-[0.9] mb-6"
            style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
          >
            Experience<br />
            <em className="text-gold/75 not-italic">the GT-X.</em>
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <p className="text-white/35 text-sm leading-8 tracking-wide max-w-lg mx-auto mb-14">
            Configure your GT-X with our bespoke personalisation suite, or arrange a private
            driving experience at a VELOX Experience Centre near you.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-10 py-4 bg-white/95 hover:bg-white text-black text-[11px] tracking-[0.3em] uppercase transition-all duration-400 hover:scale-105 overflow-hidden">
              <span className="relative z-10">Build &amp; Configure</span>
              <div className="absolute inset-0 bg-gold/20 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>
            <button className="px-10 py-4 border border-white/20 hover:border-gold/50 text-white/60 hover:text-gold text-[11px] tracking-[0.3em] uppercase transition-all duration-400 hover:bg-gold/5">
              Book a Test Drive
            </button>
          </div>
        </Reveal>

        {/* Availability note */}
        <Reveal delay={340}>
          <p className="text-white/15 text-[10px] tracking-[0.3em] uppercase mt-12">
            Production limited to 500 units worldwide · Deliveries from Q2 2025
          </p>
        </Reveal>
      </div>
    </section>
  );
}
