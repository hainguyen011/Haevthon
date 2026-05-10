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
      titleKey: 'feature_squad_v2_title',
      descKey: 'feature_squad_v2_desc',
      icon: <Users size={24} />
    },
    {
      id: 2,
      image: "/assets/card2.png",
      titleKey: 'feature_pipernet_ioa_title',
      descKey: 'feature_pipernet_ioa_desc',
      icon: <Globe size={24} />
    },
    {
      id: 3,
      image: "/assets/feature_vibe_title",
      titleKey: 'feature_vibe_profiling_title',
      descKey: 'feature_vibe_profiling_desc',
      icon: <Zap size={24} />
    },
    {
      id: 4,
      image: "/assets/card4.png",
      titleKey: 'feature_thought_stream_title',
      descKey: 'feature_thought_stream_desc',
      icon: <Sparkles size={24} />
    },
    {
      id: 5,
      image: "/assets/card5.png",
      titleKey: 'feature_memory_pulse_title',
      descKey: 'feature_memory_pulse_desc',
      icon: <Database size={24} />
    },
    {
      id: 6,
      image: "/assets/card6.png",
      titleKey: 'feature_vibe_space_title',
      descKey: 'feature_vibe_space_desc',
      icon: <Cpu size={24} />
    },
    {
      id: 7,
      image: "/assets/card7.png",
      titleKey: 'feature_persona_evo_title',
      descKey: 'feature_persona_evo_desc',
      icon: <Shield size={24} />
    },
    {
      id: 8,
      image: "/assets/card8.png",
      titleKey: 'feature_bridge_sse_title',
      descKey: 'feature_bridge_sse_desc',
      icon: <Network size={24} />
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
  },

  showcase: {
    header: {
      badgeKey: 'showcase_badge',
      titleKey: 'showcase_title'
    },
    settings: {
      cardWidth: '450px',
      cardHeight: '560px',
      borderRadius: '32px',
      parallaxRange: [40, -40],
      dragRange: -1400,
      poweredByText: 'POWERED BY AEVUM'
    },
    items: [
      {
        id: 'nexus',
        titleKey: 'showcase_nexus_title',
        descKey: 'showcase_nexus_desc',
        image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200',
        tag: 'Orchestration'
      },
      {
        id: 'ghost',
        titleKey: 'showcase_ghost_title',
        descKey: 'showcase_ghost_desc',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
        tag: 'Development'
      },
      {
        id: 'vibe',
        titleKey: 'showcase_vibe_title',
        descKey: 'showcase_vibe_desc',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200',
        tag: 'Experience'
      },
      {
        id: 'sentient',
        titleKey: 'showcase_sentient_title',
        descKey: 'showcase_sentient_desc',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
        tag: 'Infrastructure'
      }
    ]
  }
};
