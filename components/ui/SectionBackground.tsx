'use client';

import { MeshGradient } from '@paper-design/shaders-react';

type Theme = 'gold' | 'red' | 'purple' | 'black';

const themeColors: Record<Theme, string[]> = {
  black:  ['#000000', '#0a0a0a', '#111111', '#0d0d0d', '#1a1a1a'],
  gold:   ['#000000', '#0a0800', '#1a1200', '#2a1e00', '#c9a84c'],
  red:    ['#000000', '#0a0000', '#1a0000', '#2d0000', '#e8003d'],
  purple: ['#04030a', '#0a0414', '#16002e', '#2a0050', '#a855f7'],
};

export default function SectionBackground({ theme = 'gold', speed = 0.4 }: { theme?: Theme; speed?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <MeshGradient
        className="w-full h-full"
        colors={themeColors[theme]}
        speed={speed}
      />
    </div>
  );
}
