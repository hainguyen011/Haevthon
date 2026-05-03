import HeroSection from '../components/HeroSection';
import AboutHaevthon from '../components/AboutHaevthon';
import PartnersMarquee from '../components/PartnersMarquee';
import FeatureShowcase from '../components/FeatureShowcase';
import InnovationSection from '../components/InnovationSection';
import VisionSection from '../components/VisionSection';
import TracksSection from '../components/TracksSection';
import TestimonialsSection from '../components/TestimonialsSection';
import IncentivesSection from '../components/IncentivesSection';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutHaevthon />
      <PartnersMarquee />
      <FeatureShowcase />
      <InnovationSection />
      <VisionSection />
      <TracksSection />
      <TestimonialsSection />
      <IncentivesSection />
    </motion.div>
  );
};

export default Home;
