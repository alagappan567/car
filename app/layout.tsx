import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VELOX GT-X | Engineered for Perfection',
  description:
    'Experience the pinnacle of automotive engineering. The VELOX GT-X — 750 HP, 0–60 in 2.8 seconds, where cutting-edge technology meets uncompromising luxury.',
  keywords: 'luxury car, sports car, supercar, performance car, VELOX GT-X, 750hp',
  openGraph: {
    title: 'VELOX GT-X | Engineered for Perfection',
    description: 'Experience the pinnacle of automotive engineering.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-[#050505] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
