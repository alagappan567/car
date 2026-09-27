'use client';

import { useEffect, useRef, useState } from 'react';
import SectionBackground from '@/components/ui/SectionBackground';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function useCountUp(target: number, active: boolean, duration = 2000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      setVal(Math.round(pct * target));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

const stats = [
  { value: 1200, suffix: '', label: 'Horsepower',  sub: 'Hybrid V12 · 6.0L' },
  { value: 19,   suffix: '',  label: '0–60 mph',   sub: 'Launch Control' },
  { value: 280,  suffix: '',  label: 'Top Speed',  sub: 'Miles per hour' },
  { value: 1480, suffix: '',  label: 'Dry Weight',  sub: 'Kilograms' },
];

export default function LegendPerformance() {
  const { ref, visible } = useReveal();
  const c0 = useCountUp(1200, visible);
  const c1 = useCountUp(19,   visible);
  const c2 = useCountUp(280,  visible);
  const c3 = useCountUp(1480, visible);
  const counters = [c0, c1, c2, c3];

  const display = (i: number) => {
    if (i === 1) return visible ? '1.9' : '0.0';
    return String(counters[i]);
  };

  return (
    <section id="performance" className="relative bg-[#04030a] py-16 px-5 md:px-14 overflow-hidden">
      <SectionBackground theme="black" speed={0.3} />
      <div ref={ref} className={`max-w-7xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-20">
          <p className="text-[10px] text-purple-400/60 tracking-[0.6em] uppercase mb-4 font-mono">Performance</p>
          <h2 className="font-display font-light text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Numbers That<br />
            <span style={{ color: '#a855f7' }}>Defy Physics</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((s, i) => (
            <div key={s.label} className="border-l border-purple-900/40 pl-6 py-2">
              <p
                className="font-display font-light leading-none mb-2"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: i === 0 ? '#a855f7' : '#fff' }}
              >
                {display(i)}{s.suffix}
              </p>
              <p className="text-[12px] text-white/60 tracking-[0.2em] uppercase mb-1">{s.label}</p>
              <p className="text-[10px] text-white/25 tracking-wide">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-2 gap-12 border-t border-purple-900/20 pt-16">
          <div>
            <p className="text-[10px] text-purple-400/50 tracking-[0.5em] uppercase mb-5 font-mono">Powertrain</p>
            <h3 className="font-display font-light text-2xl text-white mb-4">Hybrid V12 Architecture</h3>
            <p className="text-white/40 text-sm leading-7 tracking-wide">
              The LX1 pairs a naturally aspirated 6.0-litre V12 with twin axial-flux electric motors,
              delivering seamless power across every rev range. Total system output reaches 1,200 bhp
              with zero turbo lag — pure, unfiltered response.
            </p>
          </div>
          <div>
            <p className="text-[10px] text-purple-400/50 tracking-[0.5em] uppercase mb-5 font-mono">Aerodynamics</p>
            <h3 className="font-display font-light text-2xl text-white mb-4">Active Ground Effect</h3>
            <p className="text-white/40 text-sm leading-7 tracking-wide">
              Derived directly from Formula 1 ground-effect principles, the LX1 generates up to
              1,800 kg of downforce at maximum speed. Active underbody flaps adjust 200 times
              per second to maintain perfect aerodynamic balance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
