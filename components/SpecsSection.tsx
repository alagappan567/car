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
    }}>
      {children}
    </div>
  );
}

const specGroups = [
  {
    category: 'Engine',
    specs: [
      { label: 'Configuration', value: 'Twin-turbo 4.0L V8' },
      { label: 'Power Output', value: '750 HP @ 7,200 rpm' },
      { label: 'Peak Torque', value: '620 lb·ft @ 2,500 rpm' },
      { label: 'Compression Ratio', value: '10.5:1' },
    ],
  },
  {
    category: 'Performance',
    specs: [
      { label: '0 – 60 mph', value: '2.8 seconds' },
      { label: 'Top Speed', value: '201 mph (governed)' },
      { label: 'Quarter Mile', value: '10.4 s @ 132 mph' },
      { label: 'Lateral G-force', value: '1.45 g' },
    ],
  },
  {
    category: 'Drivetrain',
    specs: [
      { label: 'Gearbox', value: '8-speed PDK dual-clutch' },
      { label: 'Drive System', value: 'All-Wheel Drive' },
      { label: 'Front / Rear Split', value: '35 / 65 (adaptive)' },
      { label: 'Differential', value: 'Torque Vectoring Plus' },
    ],
  },
  {
    category: 'Chassis',
    specs: [
      { label: 'Body Structure', value: 'Full carbon fiber monocoque' },
      { label: 'Curb Weight', value: '3,285 lbs (1,490 kg)' },
      { label: 'Weight Distribution', value: '43 / 57 F/R' },
      { label: 'Suspension', value: 'PASM active pneumatic' },
    ],
  },
  {
    category: 'Brakes',
    specs: [
      { label: 'Front', value: '410 mm PCCB ceramic' },
      { label: 'Rear', value: '380 mm PCCB ceramic' },
      { label: '60 – 0 mph', value: '98 feet' },
      { label: 'System', value: 'PABS + ABS + PSM' },
    ],
  },
  {
    category: 'Dimensions',
    specs: [
      { label: 'Length × Width × Height', value: '181.9 × 76.4 × 50.9 in' },
      { label: 'Wheelbase', value: '110.7 in (2,812 mm)' },
      { label: 'Ground Clearance', value: '3.8–5.1 in (adjustable)' },
      { label: 'Fuel Capacity', value: '19.8 US gallons' },
    ],
  },
];

export default function SpecsSection() {
  return (
    <section id="specifications" className="relative bg-[#050505] py-14 md:py-40 overflow-hidden">
      <SectionBackground theme="black" speed={0.2} />
      {/* Background number */}
      <span
        className="absolute -left-6 top-0 font-display font-light text-white/[0.022] pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(160px, 25vw, 320px)' }}
        aria-hidden
      >
        05
      </span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[10px] text-gold/60 tracking-[0.5em] uppercase font-sans">05 — Specifications</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 items-end mb-20">
          <Reveal delay={80}>
            <h2
              className="font-display font-light text-white leading-[0.9]"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              The Numbers<br />
              <em className="text-white/40 not-italic">Behind the Legend.</em>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-white/35 text-sm leading-8 tracking-wide">
              Precision at every measurement. The GT-X specification sheet reads less like a
              brochure and more like an engineering manifesto.
            </p>
          </Reveal>
        </div>

        {/* Specs grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {specGroups.map(({ category, specs }, gi) => (
            <Reveal key={category} delay={gi * 60}>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[9px] text-gold/50 tracking-[0.5em] uppercase">{category}</span>
                  <div className="flex-1 h-px bg-gold/15" />
                </div>
                <div className="space-y-0">
                  {specs.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-3.5 border-b border-white/[0.05] group hover:border-gold/20 transition-colors duration-300"
                    >
                      <span className="text-[11px] text-white/30 tracking-[0.2em] uppercase group-hover:text-white/50 transition-colors duration-300">
                        {label}
                      </span>
                      <span className="font-display font-light text-white/70 group-hover:text-gold/80 transition-colors duration-300 text-base">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Disclaimer */}
        <Reveal delay={200}>
          <p className="text-white/15 text-[10px] tracking-wide leading-6 mt-16 max-w-2xl">
            Specifications may vary by market and configuration. Performance figures achieved under optimal test conditions
            on approved surfaces. Always drive responsibly in accordance with local laws.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
