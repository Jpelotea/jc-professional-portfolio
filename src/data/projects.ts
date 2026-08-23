export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  engagement: string;
  scope: string;
  ownership: string;
  operationalOutcome: string;
  challenge: string;
  approach: string;
  contributions: string[];
  deliverables: string[];
  outcome: string;
  tools: string[];
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  socialImage?: string;
  live?: string;
  liveLabel?: string;
  liveNote?: string;
  evidenceNote?: string;
  github?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'avodah',
    index: '01',
    title: 'Avodah Wealth Advisory',
    category: 'Website Design & Development · Content Architecture · Digital Experience',
    summary:
      'A multi-page advisory website I designed and built to explain Avodah’s services clearly, guide different client audiences, and turn interest into needs-check and consultation inquiries.',
    engagement: 'Website design, development, and digital operations support',
    scope:
      'Public website architecture, service content, inquiry journeys, compliance pages, deployment, production QA, and ongoing updates.',
    ownership:
      'Site structure, responsive build, content organization, forms, trust and disclosure pages, and GitHub/Netlify delivery.',
    operationalOutcome:
      'A coherent public-facing website with clearer service navigation and direct discovery-to-inquiry paths.',
    challenge:
      'Avodah needed a credible public website that could present a broad mix of advisory services without confusing visitors or implying that the company directly lends, underwrites, or approves products. The experience also needed clear pathways for families, OFWs, seafarers, professionals, and business owners.',
    approach:
      'I organized the site around visitor intent: understand what Avodah does, identify the relevant service, complete a short needs check, and request a consultation. I paired a consistent visual system with plain-language service explanations, responsive layouts, and compliance-conscious disclosures.',
    contributions: [
      'Planned and built the multi-page website structure, responsive interface, navigation, and visual system.',
      'Wrote and organized audience-specific service content for protection, loans, travel, and business-support pathways.',
      'Created the free needs-check and consultation journeys, including inquiry forms and clear calls to action.',
      'Added supporting trust content such as FAQs, provider disclosures, privacy information, terms, and disclaimers.',
      'Managed version control, deployment, production QA, and ongoing website updates through GitHub and Netlify.'
    ],
    deliverables: [
      'Responsive multi-page company website',
      'Audience and service landing pages',
      'Free needs-check flow and planning guides',
      'Consultation inquiry form',
      'FAQs and compliance disclosures',
      'Privacy, terms, and disclaimer pages',
      'GitHub and Netlify deployment workflow'
    ],
    outcome:
      'The finished website gives Avodah a coherent public-facing presence with clearer service navigation, audience-specific guidance, stronger trust signals, and direct paths from discovery to inquiry.',
    tools: ['HTML', 'CSS', 'JavaScript', 'GitHub', 'Netlify', 'Google Analytics'],
    image: '/assets/avodah-website-proof.webp',
    imageAlt: 'Homepage of the Avodah Wealth Advisory website designed and built by JC Pelotea',
    imageWidth: 1120,
    imageHeight: 630,
    socialImage: '/assets/avodah-website.png',
    live: 'https://avodahwealthadvisory.netlify.app/',
    liveLabel: 'View Avodah website ↗',
    liveNote:
      'Live project — explore the published service pages, needs-check flow, planning guides, FAQs, consultation form, and responsive experience.',
    evidenceNote:
      'The live website is the primary public artifact. Screenshots and descriptions focus on the published experience; private client and business information is excluded.',
    featured: true
  },
  {
    slug: 'openready',
    index: '02',
    title: 'OpenReady',
    category: 'Digital Product · GitHub · Release Operations',
    summary:
      'A public repository-health assessment product shaped through product structure, documentation, roadmap planning, GitHub workflow, and static deployment.',
    engagement: 'Product structure and release operations',
    scope:
      'Assessment experience, public product presentation, documentation, roadmap structure, repository workflow, and static deployment.',
    ownership:
      'Assessment structure, product presentation, roadmap and release documentation, repository organization, and deployment validation.',
    operationalOutcome:
      'A public, inspectable product with a clearer assessment workflow and transparent release path.',
    challenge:
      'The project needed a clear user experience for turning broad open-source readiness practices into a practical, trackable workflow.',
    approach:
      'The product was organized around a guided assessment experience with transparent documentation, release notes, roadmap structure, and deployment discipline.',
    contributions: [
      'Structured the assessment experience and public product presentation.',
      'Maintained release and roadmap documentation.',
      'Used GitHub workflows and repository structure as part of delivery.',
      'Prepared and validated static deployment and supporting project assets.'
    ],
    deliverables: ['Public product experience', 'Assessment workflow', 'Roadmap', 'Repository documentation', 'Release notes'],
    outcome:
      'OpenReady became a public, inspectable product with a clearer assessment workflow and transparent release path.',
    tools: ['Astro', 'JavaScript', 'GitHub', 'Netlify', 'Documentation systems'],
    image: '/assets/openready.svg',
    imageAlt: 'Controlled composite of the OpenReady assessment workspace and roadmap',
    imageWidth: 1120,
    imageHeight: 630,
    socialImage: '/assets/openready.png',
    live: 'https://getopenready.netlify.app',
    liveLabel: 'Open live product ↗',
    github: 'https://github.com/Jpelotea/openready',
    featured: true
  },
  {
    slug: 'ice-zeta',
    index: '03',
    title: 'ICE Zeta Group',
    category: 'Brand Systems · Website · Recruitment Messaging',
    summary:
      'A leadership and career-development brand translated into a consistent identity, recruitment message, website, and repeatable content system.',
    engagement: 'Brand systems and digital execution',
    scope:
      'Identity system, messaging pillars, recruitment communication, website support, content planning, and repeatable campaign structure.',
    ownership:
      'Brand guidelines, messaging pillars, 30-day content calendar, website support, and repeatable campaign workflow.',
    operationalOutcome:
      'A more coherent brand with a repeatable communications system for recruitment and marketing activity.',
    challenge:
      'ICE Zeta needed a recognizable identity and a consistent way to communicate leadership, mentorship, career opportunity, financial education, and community.',
    approach:
      'Brand strategy and content operations were treated as one system so visual identity, messaging, recruitment communication, and recurring content could reinforce one another.',
    contributions: [
      'Developed brand guidelines, logo usage, typography, color direction, and messaging pillars.',
      'Built a 30-day Facebook content calendar and repeatable campaign structure.',
      'Supported website execution and recruitment-oriented digital messaging.',
      'Prepared consulting and project materials for continued brand execution.'
    ],
    deliverables: ['Brand guidelines', 'Visual identity system', 'Website', '30-day content calendar', 'Recruitment messaging', 'Campaign workflow'],
    outcome:
      'The project established a more coherent brand and repeatable communications system for future recruitment and marketing activity.',
    tools: ['Brand documentation', 'Content planning', 'Wix', 'Google Workspace', 'AI-assisted content systems'],
    image: '/assets/ice-zeta-website-2026-08.webp',
    imageAlt: 'ICE Zeta Group website homepage featuring its leadership and career-development message',
    imageWidth: 1100,
    imageHeight: 548,
    socialImage: '/assets/og-ice-zeta.png',
    live: 'https://jcpelotea.wixsite.com/zeta',
    liveLabel: 'View ICE Zeta website ↗',
    featured: true
  },
  {
    slug: 'konnevia',
    index: '04',
    title: 'Konnevia',
    category: 'Product Operations · Digital QA · Release Readiness',
    summary:
      'Product coordination, technical QA, documentation, deployment validation, and private-beta readiness work for a SaaS-style platform.',
    engagement: 'Product operations and release-readiness support',
    scope:
      'Requirements, technical QA, security and configuration review, deployment validation, documentation, and private-beta readiness.',
    ownership:
      'Readiness criteria, QA standards, requirements tracking, production validation, GitHub coordination, and supporting documentation.',
    operationalOutcome:
      'Clearer release criteria, QA standards, production validation, and operational tracking toward private-beta readiness.',
    challenge:
      'The platform needed coherent release discipline across authentication, tenant separation, deployment, configuration, security checks, QA, and beta-readiness decisions.',
    approach:
      'Requirements, risks, release gates, and production behavior were organized and checked against the intended product experience rather than treating feature completion as the only definition of readiness.',
    contributions: [
      'Structured product and multi-tenant requirements.',
      'Coordinated authentication, RLS, deployment, and production-readiness work.',
      'Reviewed security headers, environment configuration, secret exposure, and production behavior.',
      'Created QA, brand, and private-beta readiness standards.',
      'Tracked onboarding, monitoring, feedback, and beta exit criteria through GitHub.'
    ],
    deliverables: ['Product blueprint', 'Private-beta readiness audit', 'Brand guidelines', 'Production QA checklist', 'Security/configuration review', 'GitHub tracking'],
    outcome:
      'The product progressed toward private-beta readiness with clearer release criteria, production validation, QA standards, and operational tracking.',
    tools: ['GitHub', 'Supabase', 'Cloudflare', 'React/Vite/TypeScript ecosystem', 'QA workflows', 'AI-assisted analysis'],
    image: '/assets/konnevia-website-2026-08.png',
    imageAlt: 'Konnevia website landing page introducing its profile, conversations, leads, and appointments hub',
    imageWidth: 705,
    imageHeight: 396,
    socialImage: '/assets/og-konnevia.png',
    live: 'https://konnevia.pages.dev',
    liveLabel: 'Open public preview ↗',
    liveNote:
      'Konnevia is presented here through product operations, QA, documentation, release coordination, and readiness work. Its source repository remains private; this button opens the public deployment only.',
    featured: true
  }
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
