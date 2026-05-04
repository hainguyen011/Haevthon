import HeroSection from '../components/HeroSection';
import AboutHaevthon from '../components/AboutHaevthon';
import PartnersMarquee from '../components/PartnersMarquee';
import FeatureShowcase from '../components/FeatureShowcase';
import InnovationSection from '../components/InnovationSection';
import VisionSection from '../components/VisionSection';
import TracksSection from '../components/TracksSection';
import TestimonialsSection from '../components/TestimonialsSection';
import IncentivesSection from '../components/IncentivesSection';
import ScrollTimeline from '../components/ScrollTimeline';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollTimeline />
      <div id="hero"><HeroSection /></div>
      <div id="about"><AboutHaevthon /></div>
      <div id="partners"><PartnersMarquee /></div>
      <div id="features"><FeatureShowcase /></div>
      <div id="innovation"><InnovationSection /></div>
      <div id="vision"><VisionSection /></div>
      <div id="tracks"><TracksSection /></div>
      <div id="testimonials"><TestimonialsSection /></div>
      <div id="incentives"><IncentivesSection /></div>
    </motion.div>
  );
};

export default Home;
