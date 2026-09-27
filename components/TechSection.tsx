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

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    category: 'Intelligence',
    title: 'Neural Drive AI',
    desc: 'Processes 50 terabytes of sensor data per second. Predicts road hazards 2 seconds ahead of human perception.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    category: 'Safety',
    title: 'Predictive Shield',
    desc: '360° radar, LiDAR, and 12 ultrasonic sensors create an impenetrable awareness bubble at all speeds.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    category: 'Performance',
    title: 'Adaptive Aerodynamics',
    desc: 'Active surfaces reconfigure 1,000 times per second. Maximum downforce in corners, minimum drag on straights.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    category: 'Connectivity',
    title: 'Quantum Cockpit',
    desc: 'A 34-inch curved OLED display with haptic feedback. Contextual AI surface adapts to your driving mode.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
    category: 'Evolution',
    title: 'Over-the-Air Updates',
    desc: 'The GT-X improves overnight. Continuous powertrain calibration, new driving modes, and performance unlocks.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    category: 'Security',
    title: 'Biometric Access',
    desc: 'Fingerprint, facial recognition, and heartbeat authentication. Your car knows only you.',
  },
];

export default function TechSection() {
  return (
    <section id="technology" className="relative bg-[#080808] py-14 md:py-40 overflow-hidden">
      <SectionBackground theme="black" speed={0.35} />
      {/* Background number */}
      <span
        className="absolute right-0 top-0 font-display font-light text-white/[0.022] pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(160px, 25vw, 320px)' }}
        aria-hidden
      >
        04
      </span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[10px] text-gold/60 tracking-[0.5em] uppercase font-sans">04 — Technology</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="font-display font-light text-white leading-[0.9] mb-6"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            Intelligence<br />
            <em className="text-white/45 not-italic">Elevated.</em>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="text-white/35 text-sm leading-8 tracking-wide max-w-sm mb-20">
            The GT-X does not just perform — it thinks, adapts, and evolves. Six breakthrough
            systems working in perfect concert.
          </p>
        </Reveal>

        {/* Feature grid */}
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.05]">
          {features.map(({ icon, category, title, desc }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="bg-[#080808] p-8 md:p-10 group hover:bg-[#0e0e0e] transition-all duration-500 h-full flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold/60 group-hover:text-gold group-hover:border-gold/30 transition-all duration-400 mb-6">
                  {icon}
                </div>

                <p className="text-[9px] text-gold/40 tracking-[0.5em] uppercase mb-2">{category}</p>
                <h3 className="text-white/85 font-sans font-light tracking-[0.12em] uppercase text-[13px] mb-4">
                  {title}
                </h3>
                <p className="text-white/30 text-sm leading-7 flex-1">{desc}</p>

                {/* Bottom accent */}
                <div className="mt-6 h-px bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
