import LegendHero from '@/components/LegendHero';
import LegendPerformance from '@/components/LegendPerformance';
import LegendDesign from '@/components/LegendDesign';
import LegendCTA from '@/components/LegendCTA';
import LegendFooter from '@/components/LegendFooter';

export const metadata = {
  title: 'VELOX LX1 | Hypercar',
  description: '1200 HP. 0–60 in 1.9s. The VELOX LX1 — 25 units. A legend built for those who demand the absolute.',
};

export default function LegendPage() {
  return (
    <main className="bg-[#04030a]">
      <LegendHero />
      <LegendPerformance />
      <LegendDesign />
      <LegendCTA />
      <LegendFooter />
    </main>
  );
}
