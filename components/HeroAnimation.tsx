'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 215; // frames 002–216
const SCROLL_DISTANCE = 6000; // px of pinned scroll

function getFrameSrc(i: number): string {
  return `/frames/ezgif-frame-${String(i + 2).padStart(3, '0')}.jpg`;
}

type DrawSource = HTMLImageElement | ImageBitmap;

export default function HeroAnimation() {
  const outerRef = useRef<HTMLDivElement>(null);   // scroll trigger target
  const heroRef = useRef<HTMLDivElement>(null);    // sticky inner panel
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourcesRef = useRef<DrawSource[]>([]);
  const currentFrameRef = useRef(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const rafPendingRef = useRef(false);
  const targetFrameRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  /* ── Draw frame onto canvas ── */
  const drawFrame = useCallback((frame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const src = sourcesRef.current[frame];
    if (!src) return;

    const sw = src instanceof ImageBitmap ? src.width : (src as HTMLImageElement).naturalWidth;
    const sh = src instanceof ImageBitmap ? src.height : (src as HTMLImageElement).naturalHeight;
    if (!sw || !sh) return;

    // High-quality interpolation (re-apply after every canvas resize resets context state)
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const scale = Math.max(canvas.width / sw, canvas.height / sh);
    const ox = (canvas.width - sw * scale) / 2;
    const oy = (canvas.height - sh * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(src as CanvasImageSource, 0, 0, sw, sh, ox, oy, sw * scale, sh * scale);

    // Update DOM refs directly (no React re-render)
    if (progressBarRef.current) {
      progressBarRef.current.style.height = `${(frame / (TOTAL_FRAMES - 1)) * 100}%`;
    }
    if (scrollHintRef.current) {
      scrollHintRef.current.style.opacity = frame > 5 ? '0' : '1';
    }
    if (subtitleRef.current) {
      const pct = frame / (TOTAL_FRAMES - 1);
      subtitleRef.current.style.opacity = String(Math.max(0, 1 - pct * 3));
    }
  }, []);

  /* ── RAF-batched draw (avoids duplicate draws per frame) ── */
  const requestDraw = useCallback((frame: number) => {
    targetFrameRef.current = frame;
    if (!rafPendingRef.current) {
      rafPendingRef.current = true;
      requestAnimationFrame(() => {
        rafPendingRef.current = false;
        const f = Math.round(Math.min(targetFrameRef.current, TOTAL_FRAMES - 1));
        if (f !== currentFrameRef.current) {
          currentFrameRef.current = f;
          drawFrame(f);
        }
      });
    }
  }, [drawFrame]);

  /* ── Preload all frames ── */
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let done = 0;

    const finish = async () => {
      if ('createImageBitmap' in window) {
        try {
          const bitmaps = await Promise.all(images.map(img => createImageBitmap(img)));
          sourcesRef.current = bitmaps;
        } catch {
          sourcesRef.current = images;
        }
      } else {
        sourcesRef.current = images;
      }
      setIsLoaded(true);
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      images[i] = img;
      const onSettle = () => {
        done++;
        setLoadProgress(Math.round((done / TOTAL_FRAMES) * 100));
        if (done === TOTAL_FRAMES) finish();
      };
      img.onload = onSettle;
      img.onerror = onSettle;
    }
  }, []);

  /* ── Canvas size (DPR-aware for crisp rendering on retina/HiDPI) ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      // Cap DPR at 2 — beyond that gains are invisible but memory doubles
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;

      // Physical pixel buffer (sharp on retina)
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);

      // CSS display size stays at CSS pixels so layout is unchanged
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';

      if (isLoaded) drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    return () => window.removeEventListener('resize', resize);
  }, [isLoaded, drawFrame]);

  /* ── GSAP ScrollTrigger (no pin — CSS sticky handles visual pinning) ── */
  useEffect(() => {
    if (!isLoaded || !outerRef.current) return;
    drawFrame(0);

    const proxy = { frame: 0 };

    const anim = gsap.to(proxy, {
      frame: TOTAL_FRAMES - 1,
      ease: 'none',
      onUpdate() {
        requestDraw(proxy.frame);
      },
      scrollTrigger: {
        trigger: outerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    });

    return () => {
      anim.kill();
      anim.scrollTrigger?.kill();
    };
  }, [isLoaded, drawFrame, requestDraw]);

  return (
    <>
      {/* ─── Loading Screen ─── */}
      <div
        className={`fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="text-center select-none">
          {/* Brand */}
          <p className="text-[11px] text-white/30 tracking-[0.6em] uppercase mb-4">
            Automotive Excellence
          </p>
          <h1 className="font-display font-light text-7xl tracking-[0.6em] text-white uppercase mb-2">
            VELOX
          </h1>
          <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent mx-auto mb-10" />

          {/* Progress */}
          <div className="w-56 mx-auto space-y-3">
            <div className="h-[1px] bg-white/10 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase">
              {loadProgress < 100 ? `Loading — ${loadProgress}%` : 'Initializing'}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Outer scroll container — height gives GSAP its scroll distance ─── */}
      <div ref={outerRef} style={{ height: `calc(100vh + ${SCROLL_DISTANCE}px)` }}>

      {/* ─── Inner sticky panel — CSS sticky replaces GSAP pin (no DOM surgery) ─── */}
      <div
        ref={heroRef}
        className="relative w-full bg-black"
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
      >
        {/* Canvas — size set imperatively via DPR resize handler */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block"
        />

        {/* Vignette top/bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 20%, transparent 55%, rgba(0,0,0,0.5) 100%)' }}
        />
        {/* Mobile full overlay */}
        <div className="absolute inset-0 bg-black/55 pointer-events-none md:hidden" />
        {/* Desktop right panel gradient */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.45) 18%, rgba(0,0,0,0.2) 40%, transparent 62%)' }}
        />

        {/* ── Navbar ── */}
        <nav className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 md:px-14 py-7">
          <Link href="/" className="font-display font-light text-xl tracking-[0.5em] text-white select-none hover:text-white/70 transition-colors duration-300">
            VELOX
          </Link>

          <ul className="hidden lg:flex items-center gap-10">
            {['Models', 'Performance', 'Design', 'Technology'].map(item => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-[11px] text-white/55 hover:text-white tracking-[0.25em] uppercase transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <button className="text-[11px] border border-white/25 hover:border-gold/70 text-white/60 hover:text-gold px-6 py-2.5 tracking-[0.2em] uppercase transition-all duration-400 hover:bg-gold/5">
            Configure
          </button>
        </nav>

        {/* ── Left counter (PGR style) ── */}
        <div
          ref={subtitleRef}
          className="hidden md:flex absolute left-8 md:left-14 bottom-[28%] z-20 flex-col transition-opacity duration-300"
        >
          <div className="w-10 h-px bg-white/25 mb-3" />
          <div className="flex items-baseline gap-1">
            <span className="font-sans font-bold text-white leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>01</span>
            <span className="text-white/25 font-light text-2xl">/</span>
            <span className="text-white/25 text-base">03</span>
          </div>
          <p className="text-[8px] text-white/20 tracking-[0.4em] uppercase font-mono mt-2">VELOX GT&#8209;X</p>
        </div>

        {/* ── Scroll hint ── */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-7 left-8 md:left-14 flex flex-col gap-2 z-20 transition-opacity duration-700"
        >
          <p className="text-[9px] text-white/25 tracking-[0.45em] uppercase font-mono">Scroll</p>
          <div className="w-px h-5 bg-gradient-to-b from-white/20 to-transparent" />
        </div>

        {/* ── Frame progress bar (left edge) ── */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
          <div className="w-px h-24 bg-white/10 relative overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 right-0 w-full bg-gold/50"
              style={{ height: '0%' }}
            />
          </div>
        </div>

        {/* ── Right info panel (PGR-style) ── */}
        <div className="absolute bottom-0 right-0 z-20 flex flex-col justify-end px-5 md:px-10 pb-14 md:pb-16 w-[42%] md:w-[30%]">
          <div className="flex gap-2 mb-5">
            <span className="text-gold text-[11px]">◆</span>
            <span className="text-gold text-[11px]">◆</span>
            <span className="text-gold text-[11px]">◆</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <p className="text-[9px] text-white/40 tracking-[0.5em] uppercase font-mono">VELOX GT&#8209;X · SUPERCAR</p>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <span key={i} className="text-gold text-[12px]">★</span>)}
            </div>
          </div>
          <div className="mb-7">
            <h2 className="font-sans font-black text-white uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
              GT&#8209;X
            </h2>
            <p className="font-sans font-bold uppercase tracking-wider" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)', color: 'rgba(255,255,255,0.5)' }}>
              TWIN TURBO V8
            </p>
          </div>
          <div className="flex items-center gap-2 mb-7">
            <a href="#performance" className="flex items-center gap-2 bg-white text-black px-5 py-2.5 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-gold transition-colors duration-300">
              ▶ EXPLORE
            </a>
            <button className="flex items-center gap-2 border border-white/30 text-white px-5 py-2.5 text-[10px] tracking-[0.25em] uppercase hover:border-gold/60 hover:text-gold transition-colors duration-300">
              ⚙ CONFIGURE
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/40 hover:text-gold hover:border-gold/40 transition-colors duration-300">
              ♡
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
