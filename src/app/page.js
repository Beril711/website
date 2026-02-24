import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import SpeakersPreview from '@/components/home/SpeakersPreview';
import ProgramPreview from '@/components/home/ProgramPreview';
import FocusAreas from '@/components/home/FocusAreas';
import Sponsors from '@/components/home/Sponsors';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <SpeakersPreview />
      <ProgramPreview />
      <FocusAreas />
      <Sponsors />
    </>
  );
}