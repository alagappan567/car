import HeroAnimation from '@/components/HeroAnimation';
import PerformanceSection from '@/components/PerformanceSection';
import DesignSection from '@/components/DesignSection';
import TechSection from '@/components/TechSection';
import SpecsSection from '@/components/SpecsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'VELOX GT-X | Supercar',
  description: '750 HP. 0–60 in 2.8s. The VELOX GT-X redefines what a supercar can be.',
};

export default function CarPage() {
  return (
    <main>
      <HeroAnimation />
      <PerformanceSection />
      <DesignSection />
      <TechSection />
      <SpecsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
