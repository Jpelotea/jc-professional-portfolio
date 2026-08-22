export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  approach: string;
  contributions: string[];
  deliverables: string[];
  outcome: string;
  tools: string[];
  image?: string;
  imageAlt?: string;
  socialImage?: string;
  live?: string;
  liveLabel?: string;
  liveNote?: string;
  github?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'avodah',
    index: '01',
    title: 'Avodah Wealth Advisory',
    category: 'Business Operations · Executive Support · Digital Operations',
    summary:
      'A multi-layer operations engagement spanning dashboards, recruitment coordination, executive support, documentation, website operations, and campaign execution.',
    challenge:
      'The business needed stronger operating visibility and consistency across recurring administrative work, recruitment, client workflows, calendars, reporting, documentation, and digital execution.',
    approach:
      'I treated the work as an operating system rather than a collection of isolated tasks: centralize information, clarify ownership, standardize recurring workflows, and build practical reporting and documentation around the day-to-day business.',
    contributions: [
      'Designed and implemented automated Google Sheets and Apps Script operations dashboards.',
      'Structured appointment-setter, recruitment, calendar, reporting, and lead-management workflows.',
      'Developed SOPs, proposals, service agreements, internal references, and knowledge-base materials.',
      'Supported website structure, content, intake functionality, GitHub version control, and Netlify deployment.',
      'Developed marketing strategy, audience-specific content systems, and campaign creative.'
    ],
    deliverables: [
      'Operations hub and management dashboards',
      'Recruitment and appointment-setter systems',
      'Calendar and reporting workflows',
      'SOPs and business documentation',
      'Website operations and deployment support',
      '30-day content strategy and campaign creative'
    ],
    outcome:
      'The engagement created a clearer operating foundation with centralized tracking, repeatable workflows, structured documentation, and stronger visibility across recurring business activities.',
    tools: ['Google Workspace', 'Google Sheets', 'Apps Script', 'GitHub', 'Netlify', 'Canva', 'ChatGPT', 'Google Gemini'],
    image: '/assets/avodah-ops.webp',
    imageAlt: 'Composite of selected Avodah operations dashboards and workflow system screenshots',
    socialImage: '/assets/avodah-ops.png',
    live: 'https://avodahwealthadvisory.netlify.app/',
    liveLabel: 'View Avodah website ↗',
    liveNote:
      'The public website represents one digital-operations deliverable. The broader operations work in this case study is demonstrated through the dashboards, workflow systems, documentation, and portfolio evidence shown here.',
    featured: true
  },
  {
    slug: 'openready',
    index: '02',
    title: 'OpenReady',
    category: 'Digital Product · GitHub · Release Operations',
    summary:
      'A public repository-health assessment product shaped through product structure, documentation, roadmap planning, GitHub workflow, and static deployment.',
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
    socialImage: '/assets/og-konnevia.png',
    live: 'https://konnevia.pages.dev',
    liveLabel: 'Open public preview ↗',
    liveNote:
      'Konnevia is presented here through product operations, QA, documentation, release coordination, and readiness work. Its source repository remains private; this button opens the public deployment only.',
    featured: true
  }
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
