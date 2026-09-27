import Link from 'next/link';
import LandingShader from '@/components/LandingShader';

export const metadata = {
  title: 'VELOX | Performance Redefined',
  description: 'VELOX — manufacturers of the world\'s most advanced performance machines.',
};

const products = [
  {
    id: 'gt-x',
    href: '/car',
    category: 'Supercar',
    name: 'GT-X',
    tagline: 'V8 · 750 HP · 2.8s',
    cta: 'Explore GT-X',
    frame: '/frames/ezgif-frame-002.jpg',
    accent: '#c9a84c',
    accentRgb: '201,168,76',
  },
  {
    id: 'rs1',
    href: '/moto',
    category: 'MotoRacer',
    name: 'RS1',
    tagline: 'I4 · 220 HP · 312 km/h',
    cta: 'Explore RS1',
    frame: '/moto-frames/ezgif-frame-001.jpg',
    accent: '#e8003d',
    accentRgb: '232,0,61',
  },
  {
    id: 'lx1',
    href: '/legend',
    category: 'Hypercar',
    name: 'LX1',
    tagline: 'V12 · 1200 HP · 1.9s',
    cta: 'Explore LX1',
    frame: '/legend-frames/ezgif-frame-001.jpg',
    accent: '#a855f7',
    accentRgb: '168,85,247',
  },
];

export default function LandingPage() {
  return (
    <main className="bg-black min-h-screen">

      {/* ── Nav ── */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-14 py-4 md:py-6">
        <span className="font-display font-light text-base md:text-xl tracking-[0.4em] md:tracking-[0.5em] text-white">VELOX</span>
        <nav className="hidden md:flex items-center gap-8">
          {[{ label: 'GT-X', href: '/car' }, { label: 'RS1', href: '/moto' }, { label: 'LX1', href: '/legend' }].map(({ label, href }) => (
            <Link key={label} href={href} className="text-[11px] text-white/50 hover:text-white tracking-[0.25em] uppercase transition-colors duration-300">
              {label}
            </Link>
          ))}
        </nav>
        {/* Mobile model links */}
        <nav className="flex md:hidden items-center gap-4">
          {[{ label: 'GT-X', href: '/car' }, { label: 'RS1', href: '/moto' }, { label: 'LX1', href: '/legend' }].map(({ label, href }) => (
            <Link key={label} href={href} className="text-[10px] text-white/50 hover:text-white tracking-[0.2em] uppercase transition-colors duration-300">
              {label}
            </Link>
          ))}
        </nav>
        <span className="hidden md:block text-[10px] text-white/25 tracking-[0.3em] uppercase">2024 Collection</span>
      </header>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden">
        <LandingShader />

        {/* Left counter */}
        <div className="absolute left-8 md:left-14 bottom-[28%] z-10 hidden md:flex flex-col">
          <div className="w-10 h-px bg-white/25 mb-3" />
          <div className="flex items-baseline gap-1">
            <span className="font-sans font-bold text-white leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>03</span>
            <span className="text-white/25 font-light text-2xl">/</span>
            <span className="text-white/25 text-base">03</span>
          </div>
          <p className="text-[8px] text-white/20 tracking-[0.4em] uppercase font-mono mt-2">VELOX MODELS</p>
        </div>

        <div className="relative z-10 flex flex-col items-center">

          <p className="font-sans font-light text-[8px] md:text-[9px] text-white/30 tracking-[0.5em] md:tracking-[0.65em] uppercase mb-6 md:mb-10">
            Performance · Innovation · Legacy
          </p>

          <h1
            className="font-sans font-thin text-white uppercase"
            style={{
              fontSize: 'clamp(2rem, 12vw, 9rem)',
              letterSpacing: 'clamp(0.2em, 3vw, 0.7em)',
              lineHeight: 1,
            }}
          >
            VELOX
          </h1>

          <div className="w-24 md:w-xs h-px bg-gradient-to-r from-transparent via-white/25 to-transparent mt-5 mb-5 md:mt-8 md:mb-7" />

          <p className="font-display font-light italic text-white/40 tracking-[0.25em] md:tracking-[0.35em] text-xs md:text-base uppercase mb-10 md:mb-14">
            Choose Your Machine
          </p>

          {/* ── PGR-style Fleet Selector ── */}
          <div className="flex items-stretch divide-x divide-white/[0.07] w-full max-w-xs md:max-w-2xl border border-white/[0.07]">
            {[
              { model: 'GT-X', sub: 'TWIN TURBO V8', cat: 'SUPERCAR', diamonds: 3, accent: '#c9a84c', stars: 5, href: '/car' },
              { model: 'RS1',  sub: 'INLINE FOUR',   cat: 'MOTO RACER', diamonds: 3, accent: '#e8003d', stars: 5, href: '/moto' },
              { model: 'LX1',  sub: 'HYBRID V12',    cat: 'HYPERCAR',  diamonds: 4, accent: '#a855f7', stars: 5, href: '/legend' },
            ].map(({ model, sub, cat, diamonds, accent, stars, href }) => (
              <Link key={model} href={href}
                className="group flex flex-col items-center justify-center flex-1 py-5 px-3 md:px-6 gap-2 hover:bg-white/[0.03] transition-colors duration-300"
              >
                <div className="flex gap-1">
                  {Array.from({ length: diamonds }).map((_, i) => (
                    <span key={i} style={{ color: accent, fontSize: '9px' }}>◆</span>
                  ))}
                </div>
                <p className="text-[7px] md:text-[8px] text-white/25 tracking-[0.4em] uppercase font-mono leading-none">{cat}</p>
                <p className="font-sans font-black text-white uppercase leading-none tracking-tight text-lg md:text-2xl group-hover:text-white/90 transition-colors">
                  {model}
                </p>
                <p className="text-[7px] md:text-[8px] font-mono tracking-wider uppercase leading-none" style={{ color: accent + '99' }}>
                  {sub}
                </p>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: stars }).map((_, i) => (
                    <span key={i} style={{ color: accent, fontSize: '10px' }}>★</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 relative z-10 gap-[1px] bg-white/[0.04] p-[1px]">
        {products.map(({ id, href, category, name, tagline, cta, frame, accent, accentRgb }, idx) => (
          <Link
            key={id}
            href={href}
            className="group relative flex flex-col justify-end min-h-[55vh] md:min-h-screen overflow-hidden bg-black"
          >
            {/* Background image */}
            {frame && (
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                style={{ backgroundImage: `url(${frame})` }}
              />
            )}

            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/40" />

            {/* Hover bloom */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: `radial-gradient(ellipse 90% 55% at 50% 90%, rgba(${accentRgb},0.18) 0%, transparent 65%)` }}
            />

            {/* Inset glow border on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 1px rgba(${accentRgb},0.35)` }}
            />

            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-5 h-5 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px bg-white/20 group-hover:bg-white/50 transition-colors duration-300" />
              <div className="absolute top-0 left-0 w-px h-full bg-white/20 group-hover:bg-white/50 transition-colors duration-300" />
            </div>
            <div className="absolute top-4 right-4 w-5 h-5 pointer-events-none">
              <div className="absolute top-0 right-0 w-full h-px bg-white/20 group-hover:bg-white/50 transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-px h-full bg-white/20 group-hover:bg-white/50 transition-colors duration-300" />
            </div>

            {/* Card number */}
            <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none">
              <span className="text-[8px] font-mono text-white/20 tracking-[0.4em]">0{idx + 1}</span>
            </div>

            {/* Content */}
            <div className="relative z-10 p-5 md:p-10 pb-6 md:pb-10">
              <p className="text-[8px] md:text-[9px] font-mono tracking-[0.45em] uppercase mb-2 md:mb-4"
                style={{ color: `rgba(${accentRgb},0.8)` }}>
                {category}
              </p>
              <h2
                className="font-display font-light text-white leading-none mb-2"
                style={{ fontSize: 'clamp(2.2rem, 8vw, 5.5rem)' }}
              >
                {name}
              </h2>
              <div className="h-px mb-3 md:mb-5 w-6 group-hover:w-14 transition-all duration-500"
                style={{ backgroundColor: accent }} />
              <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-4 md:mb-8">{tagline}</p>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-[9px] md:text-[10px] font-mono tracking-[0.25em] uppercase"
                  style={{ color: `rgba(${accentRgb},0.9)` }}>{cta}</span>
                <div className="h-px w-4 group-hover:w-10 transition-all duration-500 opacity-70"
                  style={{ backgroundColor: accent }} />
                <span className="text-[10px] text-white/30 group-hover:text-white/60 transition-colors duration-300">→</span>
              </div>
            </div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
          </Link>
        ))}
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 bg-black/80 border-t border-white/[0.05] px-5 md:px-14 py-4 md:py-6 flex items-center justify-between">
        <span className="font-display font-light text-base md:text-lg tracking-[0.4em] text-white">VELOX</span>
        <p className="text-[9px] md:text-[10px] text-white/20 tracking-wide">© 2024 VELOX Automotive.</p>
      </footer>
    </main>
  );
}
