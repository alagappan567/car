'use client';

import { useEffect, useRef, useState } from 'react';
import SectionBackground from '@/components/ui/SectionBackground';

function CountUp({ value, duration = 1800 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const isFloat = value % 1 !== 0;
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          const cur = ease * value;
          setDisplay(isFloat ? Math.round(cur * 10) / 10 : Math.floor(cur));
          if (p < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [value, duration]);
  return <span ref={ref}>{display}</span>;
}

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
      opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(30px)',
      transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>{children}</div>
  );
}

const stats = [
  { value: 2.9, suffix: 's', label: '0–100 km/h' },
  { value: 312, suffix: '', label: 'Top Speed (km/h)' },
  { value: 220, suffix: '', label: 'Peak Power (HP)' },
  { value: 157, suffix: '', label: 'Dry Weight (kg)' },
];

export default function MotoPerformance() {
  return (
    <section id="performance" className="relative bg-[#070000] py-14 md:py-40 overflow-hidden">
      <SectionBackground theme="black" speed={0.35} />
      <span
        className="absolute -right-8 top-0 font-display font-light text-white/[0.02] pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(160px, 25vw, 320px)' }}
        aria-hidden
      >01</span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">
        <Reveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[10px] text-red-500/60 tracking-[0.5em] uppercase font-mono">01 — Performance</span>
            <div className="flex-1 h-px bg-gradient-to-r from-red-600/30 to-transparent" />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="font-display font-light text-white leading-[0.92] mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            Full<br />
            <em className="text-red-500/90 not-italic">Throttle.</em>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-white/35 text-sm tracking-widest leading-relaxed max-w-sm mb-20 font-sans">
            Every revolution of the inline-4 brings you closer to the edge of physics. This is what MotoGP engineering feels like on the road.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05]">
          {stats.map(({ value, suffix, label }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="bg-[#070000] px-8 py-10 md:py-14 group hover:bg-[#100000] transition-colors duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/0 via-red-900/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="font-display font-light leading-none mb-3" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                  <span className="text-white"><CountUp value={value} /></span>
                  {suffix && <span className="text-red-500/70 ml-1" style={{ fontSize: '0.45em' }}>{suffix}</span>}
                </div>
                <p className="text-[10px] text-white/30 tracking-[0.35em] uppercase font-mono">{label}</p>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-12 items-end">
          <Reveal delay={100}>
            <p className="text-white/30 text-sm leading-8 tracking-wide">
              The RS1 inline-4 engine revs freely to 15,000 RPM, extracting every last horsepower from its 1000cc displacement. Race-derived variable valve timing ensures brutal mid-range torque and a screaming top end.
            </p>
          </Reveal>
          <Reveal delay={200} className="text-right hidden md:block">
            <span className="font-display font-light text-red-600/20" style={{ fontSize: 'clamp(4rem, 7vw, 6rem)' }}>
              15K
            </span>
            <p className="text-[10px] text-white/20 tracking-[0.35em] uppercase font-mono mt-1">RPM Redline</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
