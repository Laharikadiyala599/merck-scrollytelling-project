export const scenes = [
  {
    id: "overview",
    title: "Overview",
    pageTitle: "Overview",
    theme: {
      icon: "layoutDashboard",
      tone: "blue"
    },
    narration:
      "Merck is transforming its portfolio through an expansive pipeline, new launch momentum, science driven business development, and a significant commercial opportunity that now exceeds seventy billion dollars by the mid twenty thirties.",
    hero: {
      tag: "NEW",
      heading: "Transforming the portfolio with the next wave of innovation",
      description:
        "A high-level view of the four strategic pillars driving Merck’s next phase of growth."
    },
    image: "/images/overview.jpg",
    subnav: [
      "Innovation",
      "Pipeline",
      "Launches",
      "Business Development",
      "Opportunity"
    ],
    sectionTitle: {
      bold: "Overview.",
      light: "What is driving the next phase."
    },
    infographic: {
      type: "overview-kpi",
      kpis: [
        { label: "Phase 3 Studies", value: 80, suffix: "+" },
        { label: "Expected Launches", value: 20, suffix: "+" },
        { label: "Commercial Opportunity", value: 70, prefix: "$", suffix: "B" },
        { label: "Opportunity vs KEYTRUDA", value: 2, suffix: "X" }
      ]
    },
    visual: {
      type: "chart",
      chartType: "bar",
      revealTimings: [400, 1200],
      title: "Commercial opportunity comparison",
      subtitle:
        "Potential new growth drivers are more than double consensus 2028 total KEYTRUDA sales.",
      badge: ">$70B vs ~$35B",
      color: "#0f8f86",
      data: [
        { name: "KEYTRUDA 2028", value: 35 },
        { name: "New Growth Drivers", value: 70 }
      ]
    },
    cards: [
      {
        tag: "PIPELINE",
        title: "Advancing diverse & expansive pipeline",
        text: "Around eighty Phase 3 studies are ongoing across multiple therapeutic areas."
      },
      {
        tag: "LAUNCHES",
        title: "Launching new growth drivers",
        text: "Merck expects more than twenty launches, with almost all carrying blockbuster potential."
      },
      {
        tag: "BUSINESS DEVELOPMENT",
        title: "Executing science-driven business development",
        text: "The company is actively pursuing additional value-creating transactions."
      }
    ]
  },

  {
    id: "portfolio",
    title: "Portfolio",
    pageTitle: "Portfolio",
    theme: {
      icon: "briefcase",
      tone: "purple"
    },
    narration:
      "Ten key programs represent the majority of Merck’s long term commercial opportunity and illustrate how the portfolio is being reshaped across oncology, cardiometabolic and respiratory, infectious disease, immunology, and ophthalmology.",
    hero: {
      tag: "INSIGHT",
      heading: "Ten key programs represent the majority of long-term opportunity",
      description:
        "The portfolio is increasingly concentrated around high-impact programs across five major therapeutic areas."
    },
    image: "/images/portfolio.jpg",
    subnav: [
      "Top Programs",
      "Therapeutic Areas",
      "Growth Mix",
      "Priority Assets"
    ],
    sectionTitle: {
      bold: "Portfolio.",
      light: "Where the opportunity is concentrated."
    },
    infographic: {
      type: "portfolio-pillars",
      pillars: [
        { label: "Oncology", value: 25, prefix: ">", suffix: "B" },
        { label: "Cardio & Respiratory", value: 20, prefix: "~", suffix: "B" },
        { label: "Infectious Disease", value: 15, prefix: "~", suffix: "B" },
        { label: "Immunology & Ophthalmology", value: 5, prefix: ">", suffix: "B" }
      ]
    },
    visual: {
      type: "chart",
      chartType: "pie",
      title: "Updated opportunity by therapeutic area",
      subtitle:
        "Merck’s mid-2030s opportunity spans oncology, cardiometabolic and respiratory, infectious disease, immunology, and ophthalmology.",
      badge: "Portfolio Mix",
      color: "#7c3aed",
      data: [
        { name: "Oncology", value: 25 },
        { name: "Cardio/Resp", value: 20 },
        { name: "Infectious", value: 15 },
        { name: "Immunology", value: 5 },
        { name: "Ophthalmology", value: 5 }
      ]
    },
    cards: [
      {
        tag: "KEY PROGRAMS",
        title: "Top assets drive the mix",
        text: "Leading programs include WINREVAIR, Ohtuvayre, MK-1406, ifinatamab deruxtecan, sacituzumab tirumotecan, and tulisokibart."
      },
      {
        tag: "THERAPEUTIC AREAS",
        title: "Five major opportunity areas",
        text: "The portfolio spans oncology, cardiometabolic and respiratory, infectious disease, immunology, and ophthalmology."
      },
      {
        tag: "FOCUS",
        title: "Concentrated long-term value creation",
        text: "A relatively small number of programs accounts for most of the >$70B mid-2030s opportunity."
      }
    ]
  },

  {
    id: "pipeline",
    title: "Pipeline",
    pageTitle: "Pipeline",
    theme: {
      icon: "activity",
      tone: "green"
    },
    narration:
      "Merck is entering a data rich period with multiple Phase 3 readouts across novel mechanisms in 2026 and 2027, including programs in HIV, ophthalmology, immunology, oncology, and infectious disease.",
    hero: {
      tag: "FOCUS",
      heading: "Data-rich period ahead with multiple Phase 3 readouts",
      description:
        "Key readouts are expected across 2026 and 2027 in several novel mechanisms and disease areas."
    },
    image: "/images/pipeline.jpg",
    subnav: [
      "2026 Readouts",
      "2027 Readouts",
      "Novel Mechanisms",
      "Phase 3"
    ],
    sectionTitle: {
      bold: "Pipeline.",
      light: "The next major readout cycle."
    },
    infographic: {
      type: "pipeline-timeline",
      milestones: [
        { year: "Apr 2026", title: "ISLEND-1 / ISLEND-2" },
        { year: "Aug 2026", title: "ATLAS-UC" },
        { year: "Sep 2026", title: "BRUNELLO" },
        { year: "2027", title: "TroFuse / ANCHOR / IDeate" }
      ]
    },
    visual: {
      type: "milestoneBoard",
      title: "Major Phase 3 readouts by year",
      subtitle:
        "Key late-stage catalysts are distributed across 2026 and 2027, highlighting a sustained readout period.",
      badge: "6 total major readouts",
      groups: [
        {
          year: "2026",
          items: ["ISLEND-1 / ISLEND-2", "ATLAS-UC", "BRUNELLO"]
        },
        {
          year: "2027",
          items: ["TroFuse", "ANCHOR", "IDeate"]
        }
      ]
    },
    cards: [
      {
        tag: "2026",
        title: "Near-term Phase 3 catalysts",
        text: "Key 2026 programs include ISL / LEN, MK-3000, and tulisokibart."
      },
      {
        tag: "2027",
        title: "Broader 2027 expansion",
        text: "Additional oncology and infectious disease programs broaden the catalyst set in 2027."
      },
      {
        tag: "MECHANISMS",
        title: "Novel science across categories",
        text: "The readout calendar spans HIV, ophthalmology, immunology, oncology, and influenza."
      }
    ]
  },

  {
    id: "launches",
    title: "Launches",
    pageTitle: "Launches",
    theme: {
      icon: "rocket",
      tone: "orange"
    },
    narration:
      "New product launches are contributing at an accelerating pace, with launch product revenue rising from seventy million dollars in the second quarter of twenty twenty four to eight hundred twenty four million dollars in the third quarter of twenty twenty five.",
    hero: {
      tag: "NEW",
      heading: "Accelerating contributions from new product launches",
      description:
        "Launch revenue is scaling rapidly as key new products gain traction."
    },
    image: "/images/launches.jpg",
    subnav: [
      "Launch Products",
      "Revenue Growth",
      "Momentum",
      "Commercial Scale"
    ],
    sectionTitle: {
      bold: "Launches.",
      light: "Revenue momentum is building."
    },
    infographic: {
      type: "launches-momentum",
      launchStats: [
        { label: "Q2 2024", value: 70 },
        { label: "Q3 2024", value: 203 },
        { label: "Q4 2024", value: 287 },
        { label: "Q1 2025", value: 458 }
      ]
    },
    visual: {
      type: "chart",
      chartType: "area",
      revealTimings: [300, 700, 1100, 1500, 1900, 2300],
      title: "Launch product revenue",
      subtitle:
        "Quarterly launch revenue climbed sharply from Q2 2024 through Q3 2025.",
      badge: "$824M",
      color: "#ea580c",
      data: [
        { name: "Q2 2024", value: 70 },
        { name: "Q3 2024", value: 203 },
        { name: "Q4 2024", value: 287 },
        { name: "Q1 2025", value: 458 },
        { name: "Q2 2025", value: 568 },
        { name: "Q3 2025", value: 824 }
      ]
    },
    cards: [
      {
        tag: "KEY PRODUCTS",
        title: "Launch portfolio",
        text: "Key products highlighted include WINREVAIR, Ohtuvayre, CAPVAXIVE, ENFLONSIA, and KEYTRUDA Qlex."
      },
      {
        tag: "MOMENTUM",
        title: "Steep revenue ramp",
        text: "Quarterly launch revenue more than tenfolded from Q2 2024 to Q3 2025."
      },
      {
        tag: "COMMERCIAL",
        title: "Scaling commercial contribution",
        text: "New launches are becoming a more material part of Merck’s growth algorithm."
      }
    ]
  },

  {
    id: "opportunity",
    title: "Opportunity",
    pageTitle: "Opportunity",
    theme: {
      icon: "trendingUp",
      tone: "pink"
    },
    narration:
      "Merck’s mid 2030s revenue opportunity from potential new growth drivers now exceeds seventy billion dollars, more than double consensus 2028 total KEYTRUDA sales and up by more than twenty billion dollars since last year.",
    hero: {
      tag: "GROWTH",
      heading: "Commercial opportunity from new growth drivers continues to expand",
      description:
        "The long-term opportunity has increased meaningfully and now stands at more than double consensus 2028 KEYTRUDA sales."
    },
    image: "/images/opportunity.jpg",
    subnav: [
      ">$70B Opportunity",
      "2X Comparison",
      "+$20B Growth",
      "Long-Term View"
    ],
    sectionTitle: {
      bold: "Opportunity.",
      light: "The scale is increasing."
    },
    infographic: {
      type: "opportunity-highlight",
      heroStat: { prefix: ">", value: 70, suffix: "B", label: "Mid-2030s opportunity" },
      points: [
        "More than 2X consensus 2028 KEYTRUDA sales",
        "Up by more than $20B since last year",
        "Built on launches, pipeline, and business development"
      ]
    },
    visual: {
      type: "chart",
      chartType: "bar",
      title: "Consensus KEYTRUDA vs. new growth drivers",
      subtitle:
        "The potential opportunity from new growth drivers is now more than double the 2028 KEYTRUDA baseline.",
      badge: "+$20B",
      color: "#db2777",
      data: [
        { name: "KEYTRUDA 2028", value: 35 },
        { name: "Growth Drivers", value: 70 }
      ]
    },
    cards: [
      {
        tag: "SCALE",
        title: "More than double",
        text: "The new growth driver opportunity is more than 2X consensus 2028 total KEYTRUDA sales."
      },
      {
        tag: "EXPANSION",
        title: "Meaningful step-up vs. last year",
        text: "Merck highlights a >$20B increase in opportunity since the prior year."
      },
      {
        tag: "LONG TERM",
        title: "Mid-2030s value creation",
        text: "The company is increasingly orienting the portfolio around this next wave of revenue."
      }
    ]
  },

  {
    id: "research",
    title: "Research",
    pageTitle: "Research",
    theme: {
      icon: "flask",
      tone: "cyan"
    },
    narration:
      "Merck’s research story is centered on advancing leading edge science, entering a data rich period through twenty twenty seven, and converting innovation into long term value creation.",
    hero: {
      tag: "SCIENCE",
      heading: "Delivering pipeline advancement and portfolio transformation",
      description:
        "Research, development, and execution are being tied directly to long-term patient impact and shareholder value."
    },
    image: "/images/research.jpg",
    subnav: [
      "Purpose",
      "Data-Rich Period",
      "Strategic Priorities",
      "Science"
    ],
    sectionTitle: {
      bold: "Research.",
      light: "How science translates into impact."
    },
    infographic: {
      type: "research-grid",
      items: [
        "Advance leading-edge science",
        "Multiple impactful Phase 3 readouts",
        "Successful acceleration of the pipeline",
        "Create long-term value"
      ]
    },
    visual: {
      type: "chart",
      chartType: "pie",
      title: "Research priorities",
      subtitle:
        "Merck frames the next phase around purpose, readouts, and strategic execution.",
      badge: "3 Core Themes",
      color: "#0891b2",
      data: [
        { name: "Purpose", value: 1 },
        { name: "Data-Rich Period", value: 1 },
        { name: "Strategic Priorities", value: 1 }
      ]
    },
    cards: [
      {
        tag: "PURPOSE",
        title: "Leading-edge science",
        text: "Research is framed around saving and improving lives while creating long-term value."
      },
      {
        tag: "READOUTS",
        title: "Entering a data-rich period",
        text: "Multiple impactful Phase 3 readouts are expected through 2027."
      },
      {
        tag: "EXECUTION",
        title: "Strategic priorities in motion",
        text: "Acceleration and augmentation of the pipeline have yielded more than twenty potential growth drivers."
      }
    ]
  },

  {
    id: "healthcare",
    title: "Healthcare",
    pageTitle: "Healthcare",
    theme: {
      icon: "stethoscope",
      tone: "red"
    },
    narration:
      "Merck achieved notable clinical and regulatory milestones in twenty twenty five across oncology, cardiometabolic, infectious disease, and animal health, while also delivering additional positive data readouts.",
    hero: {
      tag: "IMPACT",
      heading: "Achieved notable clinical and regulatory milestones",
      description:
        "Merck’s recent healthcare impact spans approvals, positive data readouts, and additional trial initiations."
    },
    image: "/images/healthcare.jpg",
    subnav: [
      "Approvals",
      "Readouts",
      "Trial Initiations",
      "Patient Impact"
    ],
    sectionTitle: {
      bold: "Healthcare.",
      light: "Recent milestones across care categories."
    },
    infographic: {
      type: "healthcare-impact",
      metrics: [
        { label: "Major Approval Areas", value: 4 },
        { label: "Positive Readout Categories", value: 3 },
        { label: "Select Trial Initiation Areas", value: 4 }
      ]
    },
    visual: {
      type: "chart",
      chartType: "bar",
      title: "2025 milestone mix",
      subtitle:
        "Recent activity spans approvals and positive readouts across multiple therapeutic areas.",
      badge: "2025",
      color: "#dc2626",
      data: [
        { name: "Oncology", value: 4 },
        { name: "Cardiometabolic", value: 1 },
        { name: "Infectious", value: 1 },
        { name: "Animal Health", value: 2 }
      ]
    },
    cards: [
      {
        tag: "APPROVALS",
        title: "Significant approvals",
        text: "The presentation highlights advances in KEYTRUDA, WINREVAIR, ENFLONSIA, BRAVECTO QUANTUM, and NUMELVI."
      },
      {
        tag: "READOUTS",
        title: "Key positive data readouts",
        text: "Positive data updates span oncology, cardiometabolic, and infectious disease programs."
      },
      {
        tag: "INITIATIONS",
        title: "More studies moving forward",
        text: "Trial starts expand the future pipeline across oncology, infectious disease, immunology, and ophthalmology."
      }
    ]
  },

  {
    id: "analytics",
    title: "Analytics",
    pageTitle: "Analytics",
    theme: {
      icon: "barChart",
      tone: "indigo"
    },
    narration:
      "Merck’s commercial opportunity is becoming increasingly clinically derisked, with revenue potential building from today through twenty twenty six, twenty twenty seven, and twenty twenty eight plus.",
    hero: {
      tag: "DATA",
      heading: "Increasingly clinically derisked opportunity",
      description:
        "The long-term revenue stack is becoming more visible as programs advance through development milestones."
    },
    image: "/images/analytics.jpg",
    subnav: [
      "Today",
      "2026",
      "2027",
      "2028+",
      "Opportunity Stack"
    ],
    sectionTitle: {
      bold: "Analytics.",
      light: "How the opportunity is maturing."
    },
    infographic: {
      type: "analytics-panels",
      panels: [
        { title: "Today", text: "Current marketed and near-term assets establish the first layer of opportunity." },
        { title: "2026–2027", text: "Additional programs become increasingly clinically derisked as major readouts arrive." },
        { title: "2028+", text: "Innovative later programs extend the stack toward the full >$70B opportunity." }
      ]
    },
    visual: {
      type: "chart",
      chartType: "area",
      revealTimings: [300, 900, 1500, 2100],
      title: "Opportunity stack progression",
      subtitle:
        "Merck shows clinically derisked revenue opportunity building over time toward the >$70B long-term view.",
      badge: "Today → 2028+",
      color: "#4f46e5",
      data: [
        { name: "Today", value: 20 },
        { name: "2026", value: 35 },
        { name: "2027", value: 55 },
        { name: "2028+", value: 70 }
      ]
    },
    cards: [
      {
        tag: "DERISKING",
        title: "Stepwise opportunity building",
        text: "The slide sequence shows how today’s base expands through 2026, 2027, and later years."
      },
      {
        tag: "PROGRAMS",
        title: "Named programs support the stack",
        text: "Assets such as WINREVAIR, Ohtuvayre, ENFLONSIA, MK-3000, MK-1406, and others contribute to visibility."
      },
      {
        tag: "SIGNAL",
        title: "Visibility improves over time",
        text: "The presentation frames the revenue profile as increasingly clinically derisked."
      }
    ]
  },

  {
    id: "global",
    title: "Global",
    pageTitle: "Global",
    theme: {
      icon: "globe",
      tone: "teal"
    },
    narration:
      "Merck continues to augment its pipeline and portfolio through global, science driven business development, highlighting select 2025 transactions and a strong track record with more than sixty billion dollars invested since twenty twenty one.",
    hero: {
      tag: "GLOBAL",
      heading: "Science-driven business development at global scale",
      description:
        "Partnerships and transactions continue to broaden the portfolio and strengthen long-term optionality."
    },
    image: "/images/global.jpg",
    subnav: [
      "2025 Transactions",
      "Partnerships",
      ">$60B Invested",
      "Strategic Reach"
    ],
    sectionTitle: {
      bold: "Global.",
      light: "How external innovation expands the portfolio."
    },
    infographic: {
      type: "global-footprint",
      regions: [
        "Verona Pharma / Ohtuvayre",
        "Cidara / MK-1406",
        "Hengrui / MK-7262",
        ">$60B invested since 2021",
        "Broad collaboration network"
      ]
    },
    cards: [
      {
        tag: "2025",
        title: "Select transactions",
        text: "The deck highlights Ohtuvayre, MK-1406, and MK-7262 as examples of 2025 portfolio augmentation."
      },
      {
        tag: "PARTNERS",
        title: "Large collaboration set",
        text: "The presentation shows a broad network of partners supporting science-driven deal activity."
      },
      {
        tag: "TRACK RECORD",
        title: "Capital deployed at scale",
        text: "Merck highlights a track record of more than $60B invested since 2021."
      }
    ]
  },
{
  id: "appendix",
  title: "Appendix",
  pageTitle: "Appendix",

  theme: {
    icon: "fileText",
    tone: "indigo"
  },

  narration:
    "This appendix includes animated supporting infographics and reference slides.",

  hero: {
    tag: "REFERENCE",
    heading: "Appendix",
    description:
      "Animated supporting infographics and reference visuals for deeper discussion."
  },

  image: "/images/appendix.jpg",

  subnav: [
    "Strength Analysis",
    "Team Strategy",
    "Risk Tools",
    "Timeline",
    "Positioning"
  ],

  sectionTitle: {
    bold: "Appendix.",
    light: "Animated supporting infographics."
  },

  infographic: null,
  visual: null,
  cards: []
}
 
  
];