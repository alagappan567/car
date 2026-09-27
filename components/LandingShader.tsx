'use client';

import { useShaderBackground } from './ui/animated-shader-hero';

export default function LandingShader() {
  const canvasRef = useShaderBackground();
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full touch-none"
      style={{ background: '#000' }}
    />
  );
}
