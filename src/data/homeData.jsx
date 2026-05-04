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
    logo: "/assets/haevthon-logo.png",
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
      titleKey: 'track1_title',
      descKey: 'track1_desc',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
      )
    },
    {
      id: 2,
      image: "/assets/card2.png",
      titleKey: 'track2_title',
      descKey: 'track2_desc',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>
      )
    },
    {
      id: 3,
      image: "/assets/card3.png",
      titleKey: 'track3_title',
      descKey: 'track3_desc',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      )
    },
    {
      id: 4,
      image: "/assets/card4.png",
      titleKey: 'track4_title',
      descKey: 'track4_desc',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      )
    },
    {
      id: 5,
      image: "/assets/card5.png",
      titleKey: 'edge5_title',
      descKey: 'edge5_desc',
      icon: <Network size={24} />
    },
    {
      id: 6,
      image: "/assets/card6.png",
      titleKey: 'edge6_title',
      descKey: 'edge6_desc',
      icon: <Zap size={24} />
    },
    {
      id: 7,
      image: "/assets/card7.png",
      titleKey: 'edge7_title',
      descKey: 'edge7_desc',
      icon: <Shield size={24} />
    },
    {
      id: 8,
      image: "/assets/card8.png",
      titleKey: 'edge8_title',
      descKey: 'edge8_desc',
      icon: <Globe size={24} />
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
        titleKey: 'innovation_highlight1_title',
        descKey: 'innovation_highlight1_desc'
      },
      {
        icon: <Zap size={24} />,
        titleKey: 'innovation_highlight2_title',
        descKey: 'innovation_highlight2_desc'
      },
      {
        icon: <Globe size={24} />,
        titleKey: 'innovation_highlight3_title',
        descKey: 'innovation_highlight3_desc'
      }
    ]
  },

  tracks: [
    {
      id: 1,
      titleKey: 'track1_title',
      descKey: 'track1_desc',
      icon: <Users size={24} />,
      color: 'rgba(255,255,255,0.1)'
    },
    {
      id: 2,
      titleKey: 'track2_title',
      descKey: 'track2_desc',
      icon: <Network size={24} />,
      color: 'rgba(255,255,255,0.1)'
    },
    {
      id: 3,
      titleKey: 'track3_title',
      descKey: 'track3_desc',
      icon: <Database size={24} />,
      color: 'rgba(255,255,255,0.1)'
    },
    {
      id: 4,
      titleKey: 'track4_title',
      descKey: 'track4_desc',
      icon: <Sparkles size={24} />,
      color: 'rgba(255,255,255,0.1)'
    },
    {
      id: 5,
      titleKey: 'track5_title',
      descKey: 'track5_desc',
      icon: <Database size={24} />,
      color: 'rgba(255,255,255,0.1)'
    },
    {
      id: 6,
      titleKey: 'track6_title',
      descKey: 'track6_desc',
      icon: <Globe size={24} />,
      color: 'rgba(255,255,255,0.1)'
    }
  ],

  timeline: {
    titleKey: 'timeline_page_title',
    subtitleKey: 'timeline_page_subtitle',
    phases: [
      {
        titleKey: 'timeline_phase0_title',
        descKey: 'timeline_phase0_desc',
        dateKey: 'timeline_phase0_date',
        locationKey: 'timeline_phase0_location',
        status: 'active',
        itemsKey: 'timeline_phase0_items'
      },
      {
        titleKey: 'timeline_phase1_title',
        descKey: 'timeline_phase1_desc',
        dateKey: 'timeline_phase1_date',
        locationKey: 'timeline_phase1_location',
        status: 'upcoming',
        itemsKey: 'timeline_phase1_items'
      },
      {
        titleKey: 'timeline_phase2_title',
        descKey: 'timeline_phase2_desc',
        dateKey: 'timeline_phase2_date',
        locationKey: 'timeline_phase2_location',
        status: 'upcoming',
        itemsKey: 'timeline_phase2_items'
      },
      {
        titleKey: 'timeline_phase3_title',
        descKey: 'timeline_phase3_desc',
        dateKey: 'timeline_phase3_date',
        locationKey: 'timeline_phase3_location',
        status: 'upcoming',
        itemsKey: 'timeline_phase3_items'
      },
      {
        titleKey: 'timeline_phase4_title',
        descKey: 'timeline_phase4_desc',
        dateKey: 'timeline_phase4_date',
        locationKey: 'timeline_phase4_location',
        status: 'upcoming',
        itemsKey: 'timeline_phase4_items'
      },
      {
        titleKey: 'timeline_phase5_title',
        descKey: 'timeline_phase5_desc',
        dateKey: 'timeline_phase5_date',
        locationKey: 'timeline_phase5_location',
        status: 'upcoming',
        itemsKey: 'timeline_phase5_items'
      }
    ]
  }
};
