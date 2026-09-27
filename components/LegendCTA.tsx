'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import SectionBackground from '@/components/ui/SectionBackground';

export default function LegendCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-[#04030a] py-20 px-5 text-center overflow-hidden">
      <SectionBackground theme="black" speed={0.4} />
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <p className="text-[10px] text-purple-400/50 tracking-[0.7em] uppercase mb-8 font-mono">Limited to 25 Units</p>
        <h2 className="font-display font-light text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
          Own a<br /><span style={{ color: '#a855f7' }}>Legend</span>
        </h2>
        <p className="text-white/35 text-sm leading-8 tracking-wide mb-14 max-w-xl mx-auto">
          The VELOX LX1 is produced exclusively to order. Each car is a bespoke collaboration
          between client and craftsman — a machine built precisely to your vision.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white text-[11px] tracking-[0.25em] uppercase transition-all duration-300 hover:scale-105">
            Reserve Your LX1
          </button>
          <Link
            href="/"
            className="px-10 py-4 border border-white/15 hover:border-purple-500/50 text-white/50 hover:text-purple-300 text-[11px] tracking-[0.25em] uppercase transition-all duration-300 inline-block"
          >
            ← Back to VELOX
          </Link>
        </div>
      </div>
    </section>
  );
}
