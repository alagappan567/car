'use client';

import React, { useRef, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface HeroProps {
  trustBadge?: { text: string; icons?: string[] };
  headline: { line1: string; line2: string };
  subtitle: string;
  buttons?: {
    primary?: { text: string; onClick?: () => void };
    secondary?: { text: string; onClick?: () => void };
  };
  className?: string;
}

// ─── Default shader source ────────────────────────────────────────────────────
const defaultShaderSource = `#version 300 es
/*
* made by Matthias Hurrle (@atzedent)
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(in vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}return t;}
float clouds(vec2 p){float d=1.,t=.0;for(float i=.0;i<3.;i++){float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);t=mix(t,d,a);d=a;p*=2./(i+1.);}return t;}
void main(void){
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.0008/d*(cos(sin(i)*vec3(.3,.3,.32))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.0012*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.06,bg*.06,bg*.07),d);
  }
  O=vec4(col,1);
}`;

// ─── WebGL Renderer ───────────────────────────────────────────────────────────
class WebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;
  private scale: number;
  private shaderSource: string;
  private mouseMove = [0, 0];
  private mouseCoords = [0, 0];
  private pointerCoords = [0, 0];
  private nbrOfPointers = 0;

  private readonly vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;
  private readonly vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

  constructor(canvas: HTMLCanvasElement, scale: number) {
    this.canvas = canvas;
    this.scale = scale;
    const gl = canvas.getContext('webgl2');
    if (!gl) throw new Error('WebGL2 not supported');
    this.gl = gl;
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
    this.shaderSource = defaultShaderSource;
  }

  updateShader(source: string) { this.reset(); this.shaderSource = source; this.setup(); this.init(); }
  updateMove(d: number[]) { this.mouseMove = d; }
  updateMouse(c: number[]) { this.mouseCoords = c; }
  updatePointerCoords(c: number[]) { this.pointerCoords = c; }
  updatePointerCount(n: number) { this.nbrOfPointers = n; }
  updateScale(s: number) { this.scale = s; this.gl.viewport(0, 0, this.canvas.width * s, this.canvas.height * s); }

  private compile(shader: WebGLShader, source: string) {
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', this.gl.getShaderInfoLog(shader));
    }
  }

  test(source: string): string | null {
    const gl = this.gl;
    const s = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(s, source);
    gl.compileShader(s);
    const result = gl.getShaderParameter(s, gl.COMPILE_STATUS) ? null : gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    return result;
  }

  reset() {
    const gl = this.gl;
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs); }
      if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs); }
      gl.deleteProgram(this.program);
    }
  }

  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER)!;
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    this.compile(this.vs, this.vertexSrc);
    this.compile(this.fs, this.shaderSource);
    this.program = gl.createProgram()!;
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(this.program));
  }

  init() {
    const gl = this.gl;
    const p = this.program!;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(p, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    (p as any).resolution = gl.getUniformLocation(p, 'resolution');
    (p as any).time = gl.getUniformLocation(p, 'time');
    (p as any).move = gl.getUniformLocation(p, 'move');
    (p as any).touch = gl.getUniformLocation(p, 'touch');
    (p as any).pointerCount = gl.getUniformLocation(p, 'pointerCount');
    (p as any).pointers = gl.getUniformLocation(p, 'pointers');
  }

  render(now = 0) {
    const gl = this.gl;
    const p = this.program;
    if (!p || gl.getProgramParameter(p, gl.DELETE_STATUS)) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(p);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.uniform2f((p as any).resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f((p as any).time, now * 1e-3);
    gl.uniform2f((p as any).move, this.mouseMove[0], this.mouseMove[1]);
    gl.uniform2f((p as any).touch, this.mouseCoords[0], this.mouseCoords[1]);
    gl.uniform1i((p as any).pointerCount, this.nbrOfPointers);
    gl.uniform2fv((p as any).pointers, this.pointerCoords);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

// ─── Pointer Handler ──────────────────────────────────────────────────────────
class PointerHandler {
  private scale: number;
  private active = false;
  private pointers = new Map<number, number[]>();
  private lastCoords = [0, 0];
  private moves = [0, 0];

  constructor(element: HTMLCanvasElement, scale: number) {
    this.scale = scale;
    const map = (el: HTMLCanvasElement, s: number, x: number, y: number) => [x * s, el.height - y * s];
    element.addEventListener('pointerdown', (e) => { this.active = true; this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY)); });
    element.addEventListener('pointerup', (e) => { if (this.pointers.size === 1) this.lastCoords = this.firstCoords; this.pointers.delete(e.pointerId); this.active = this.pointers.size > 0; });
    element.addEventListener('pointerleave', (e) => { if (this.pointers.size === 1) this.lastCoords = this.firstCoords; this.pointers.delete(e.pointerId); this.active = this.pointers.size > 0; });
    element.addEventListener('pointermove', (e) => { if (!this.active) return; this.lastCoords = [e.clientX, e.clientY]; this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY)); this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY]; });
  }

  updateScale(s: number) { this.scale = s; }

  get count() { return this.pointers.size; }
  get move() { return this.moves; }
  get coords() { return this.pointers.size > 0 ? Array.from(this.pointers.values()).flat() : [0, 0]; }
  private get firstCoords() { return this.pointers.values().next().value ?? this.lastCoords; }
  get first() { return this.firstCoords; }
}

// ─── Hook: useShaderBackground ────────────────────────────────────────────────
export const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const pointersRef = useRef<PointerHandler | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!canvas.getContext('webgl2')) return;

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer(canvas, dpr);
    } catch {
      return;
    }
    const pointers = new PointerHandler(canvas, dpr);
    rendererRef.current = renderer;
    pointersRef.current = pointers;

    const resize = () => {
      const d = Math.max(1, 0.5 * window.devicePixelRatio);
      canvas.width = window.innerWidth * d;
      canvas.height = window.innerHeight * d;
      renderer.updateScale(d);
      pointers.updateScale(d);
    };

    const loop = (now: number) => {
      renderer.updateMouse(pointers.first);
      renderer.updatePointerCount(pointers.count);
      renderer.updatePointerCoords(pointers.coords);
      renderer.updateMove(pointers.move);
      renderer.render(now);
      rafRef.current = requestAnimationFrame(loop);
    };

    resize();
    renderer.setup();
    renderer.init();
    if (renderer.test(defaultShaderSource) === null) renderer.updateShader(defaultShaderSource);
    loop(0);

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      renderer.reset();
    };
  }, []);

  return canvasRef;
};

// ─── Hero Component ───────────────────────────────────────────────────────────
const Hero: React.FC<HeroProps> = ({ trustBadge, headline, subtitle, buttons, className = '' }) => {
  const canvasRef = useShaderBackground();

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full touch-none"
        style={{ background: 'black' }}
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        {trustBadge && (
          <div className="mb-8 animate-fade-in-down">
            <div className="flex items-center gap-2 px-6 py-3 bg-orange-500/10 backdrop-blur-md border border-orange-300/30 rounded-full text-sm">
              {trustBadge.icons?.map((icon, i) => <span key={i}>{icon}</span>)}
              <span className="text-orange-100">{trustBadge.text}</span>
            </div>
          </div>
        )}

        <div className="text-center space-y-6 max-w-5xl mx-auto px-4">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
              {headline.line1}
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-400">
              {headline.line2}
            </h1>
          </div>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-orange-100/90 font-light leading-relaxed animate-fade-in-up animation-delay-600">
            {subtitle}
          </p>
          {buttons && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in-up animation-delay-800">
              {buttons.primary && (
                <button onClick={buttons.primary.onClick} className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25">
                  {buttons.primary.text}
                </button>
              )}
              {buttons.secondary && (
                <button onClick={buttons.secondary.onClick} className="px-8 py-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/30 hover:border-orange-300/50 text-orange-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
