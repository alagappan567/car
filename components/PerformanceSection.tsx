'use client';

import { useEffect, useRef, useState } from 'react';
import SectionBackground from '@/components/ui/SectionBackground';

const stats = [
  { value: 2.8, suffix: 's', label: '0 – 60 mph', delay: 0 },
  { value: 201, suffix: '', label: 'Top Speed (mph)', delay: 100 },
  { value: 750, suffix: '', label: 'Peak Power (hp)', delay: 200 },
  { value: 620, suffix: '', label: 'Torque (lb·ft)', delay: 300 },
];

function CountUp({ value, duration = 1800 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const isFloat = value % 1 !== 0;
          const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const cur = eased * value;
            setDisplay(isFloat ? Math.round(cur * 10) / 10 : Math.floor(cur));
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

function RevealItem({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); o.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function PerformanceSection() {
  return (
    <section id="performance" className="relative bg-[#060606] py-14 md:py-40 overflow-hidden">
      <SectionBackground theme="black" speed={0.3} />
      {/* Background watermark */}
      <span
        className="absolute -right-8 top-0 font-display font-light text-white/[0.025] pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(160px, 25vw, 320px)' }}
        aria-hidden
      >
        02
      </span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">
        {/* Section label */}
        <RevealItem>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[10px] text-gold/60 tracking-[0.5em] uppercase font-sans">
              02 — Performance
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
        </RevealItem>

        {/* Headline */}
        <RevealItem delay={100}>
          <h2
            className="font-display font-light text-white leading-[0.92] mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            Zero
            <br />
            <em className="text-gold/80 not-italic">Compromise.</em>
          </h2>
        </RevealItem>

        <RevealItem delay={180}>
          <p className="text-white/45 text-sm tracking-widest leading-relaxed max-w-sm mb-20">
            Every component engineered to the edge of physical law. Every number a testament
            to obsession.
          </p>
        </RevealItem>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06]">
          {stats.map(({ value, suffix, label, delay }) => (
            <RevealItem key={label} delay={delay} className="h-full">
              <div className="bg-[#060606] px-8 py-10 md:py-14 relative overflow-hidden group hover:bg-[#0c0c0c] transition-colors duration-500">
                {/* Shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="font-display font-light leading-none mb-3" style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)' }}>
                  <span className="text-white">
                    <CountUp value={value} />
                  </span>
                  {suffix && (
                    <span className="text-gold/70 ml-1" style={{ fontSize: '0.45em' }}>
                      {suffix}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-white/35 tracking-[0.35em] uppercase font-sans">{label}</p>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </RevealItem>
          ))}
        </div>

        {/* Bottom description */}
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-end">
          <RevealItem delay={100}>
            <p className="text-white/35 text-sm leading-8 tracking-wide">
              The GT-X rewrites what a high-performance machine can be. Twin-turbocharged,
              all-wheel-drive, with an active aerodynamics system that adapts 1,000 times per second.
              The result is a car that feels as instinctive as thought.
            </p>
          </RevealItem>
          <RevealItem delay={200} className="text-right hidden md:block">
            <span
              className="font-display font-light text-gold/20"
              style={{ fontSize: 'clamp(4rem, 7vw, 6rem)' }}
            >
              PDK
            </span>
            <p className="text-[10px] text-white/25 tracking-[0.35em] uppercase mt-1">
              8-Speed Dual-Clutch
            </p>
          </RevealItem>
        </div>
      </div>
    </section>
  );
}
