import React from 'react';
import { 
  Users, Network, Database, Sparkles, 
  Cpu, Zap, Globe, Shield 
} from 'lucide-react';

export const homeData = {
  hero: {
    badge: "I2FLabs - Innovations To Future Labs",
    titleKey: "hero_title",
    subtitleKey: "hero_subtitle",
    cta_primary_key: "hero_cta_register",
    cta_secondary_key: "hero_cta_explore",
    logo: "/assets/I2FLabs-logo.png",
    stats: [
      { labelKey: 'stats_prizepool', value: '$10,000+' },
      { labelKey: 'stats_format', valueKey: 'stats_format_val' },
      { labelKey: 'stats_timeline', valueKey: 'stats_timeline_val' }
    ]
  },
  
  features: [
    {
      id: 1,
      image: "/assets/card1.png",
      titleKey: 'feature_agents_title',
      descKey: 'feature_agents_desc',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
      )
    },
    {
      id: 2,
      image: "/assets/card2.png",
      titleKey: 'feature_workflow_title',
      descKey: 'feature_workflow_desc',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>
      )
    },
    {
      id: 3,
      image: "/assets/card3.png",
      titleKey: 'feature_marketplace_title',
      descKey: 'feature_marketplace_desc',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      )
    },
    {
      id: 4,
      image: "/assets/card4.png",
      titleKey: 'feature_wildcard_title',
      descKey: 'feature_wildcard_desc',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      )
    }
  ],

  innovation: {
    badgeKey: 'innovation_badge',
    titleKey: 'innovation_title',
    descKey: 'innovation_desc',
    stats: "92%",
    statsLabelKey: 'innovation_stats_believe',
    highlights: [
      {
        icon: <Cpu size={24} />,
        titleKey: 'innovation_agent_title',
        descKey: 'innovation_agent_desc'
      },
      {
        icon: <Zap size={24} />,
        titleKey: 'innovation_speed_title',
        descKey: 'innovation_speed_desc'
      },
      {
        icon: <Globe size={24} />,
        titleKey: 'innovation_scale_title',
        descKey: 'innovation_scale_desc'
      }
    ]
  }
};
