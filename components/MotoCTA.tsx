'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
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
    }}>{children}</div>
  );
}

export default function MotoCTA() {
  return (
    <section className="relative bg-[#000000] py-16 md:py-48 overflow-hidden">
      <SectionBackground theme="black" speed={0.4} />
      <span
        className="absolute inset-0 flex items-center justify-center font-display font-light text-white/[0.02] pointer-events-none select-none text-center leading-none"
        style={{ fontSize: 'clamp(100px, 20vw, 260px)' }}
        aria-hidden
      >RS1</span>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,0,40,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-4xl mx-auto px-6 md:px-14 text-center">
        <Reveal>
          <p className="text-[10px] text-red-500/50 tracking-[0.6em] uppercase mb-8 font-mono">Claim Your RS1</p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="font-display font-light text-white leading-[0.9] mb-6"
            style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
          >
            Ready to<br />
            <em className="text-red-500/85 not-italic">Race?</em>
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <div className="w-16 h-px bg-red-600/40 mx-auto mb-8" />
          <p className="text-white/30 text-sm leading-8 tracking-wide max-w-lg mx-auto mb-14">
            Configure your RS1 with race livery, exhaust options, and suspension setup. Or book a track day to experience it at the limit before you decide.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-10 py-4 bg-red-600 hover:bg-red-500 text-white text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:scale-105 overflow-hidden">
              Build &amp; Configure
            </button>
            <button className="px-10 py-4 border border-red-600/30 hover:border-red-500/60 text-white/50 hover:text-red-400 text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:bg-red-900/15">
              Book a Track Day
            </button>
          </div>
        </Reveal>
        <Reveal delay={340}>
          <p className="text-white/15 text-[10px] tracking-[0.3em] uppercase mt-12 font-mono">
            200 units per year · Race homologation approved · Deliveries from Q3 2025
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-10">
            <Link href="/" className="text-[11px] text-white/20 hover:text-white/50 tracking-[0.3em] uppercase transition-colors duration-300">
              ← Back to VELOX
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
