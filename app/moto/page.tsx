import MotoHero from '@/components/MotoHero';
import MotoPerformance from '@/components/MotoPerformance';
import MotoEngineering from '@/components/MotoEngineering';
import MotoHeritage from '@/components/MotoHeritage';
import MotoCTA from '@/components/MotoCTA';
import MotoFooter from '@/components/MotoFooter';

export const metadata = {
  title: 'VELOX RS1 | MotoRacing',
  description: '220 HP. 0–100 in 2.9s. The VELOX RS1 — born on the track, built for the limit.',
};

export default function MotoPage() {
  return (
    <main className="bg-[#080000]">
      <MotoHero />
      <MotoPerformance />
      <MotoEngineering />
      <MotoHeritage />
      <MotoCTA />
      <MotoFooter />
    </main>
  );
}
