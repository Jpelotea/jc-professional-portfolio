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
  caseStudyFocus?: 'operations' | 'frontend';
  proofPoints?: { value: string; label: string }[];
  technicalDecisions?: { title: string; detail: string }[];
  validation?: string[];
  gallery?: { src: string; alt: string; caption: string; width: number; height: number }[];
  conversionFlow?: string[];
};

export const projects: Project[] = [
  {
    slug: 'avodah',
    index: '01',
    title: 'Avodah Wealth Advisory',
    category: 'Frontend Development · Information Architecture · Conversion Delivery',
    summary:
      'A production-deployed, 29-page advisory website with audience-specific service pathways, two lead-capture journeys, accessible forms, analytics, SEO infrastructure, and security headers.',
    engagement: 'Website design, development, and digital operations support',
    scope:
      'Public website architecture, service content, inquiry journeys, compliance pages, deployment, production QA, and ongoing updates.',
    ownership:
      'Site structure, responsive build, content organization, forms, trust and disclosure pages, and GitHub/Netlify delivery.',
    operationalOutcome:
      'A 29-page public website with two production lead-capture journeys and a repeatable GitHub-to-Netlify release workflow.',
    challenge:
      'Avodah needed a credible public website that could present a broad mix of advisory services without confusing visitors or implying that the company directly lends, underwrites, or approves products. The experience also needed clear pathways for families, OFWs, seafarers, professionals, and business owners.',
    approach:
      'I organized the site around visitor intent rather than an exclusively product-led catalog: understand the service, identify the relevant audience path, complete a needs check or request a consultation, and reach a confirmed thank-you state. Static HTML, CSS, and JavaScript kept the deployment surface small and predictable.',
    contributions: [
      'Planned and built the multi-page website structure, responsive interface, navigation, and visual system.',
      'Wrote and organized audience-specific service content for protection, loans, travel, and business-support pathways.',
      'Implemented two Netlify Forms journeys with honeypot protection, client-side validation, accessible inline errors, first-invalid-field focus, and thank-you handling.',
      'Added GA4 page-view measurement and recorded `generate_lead` only after a confirmed successful conversion.',
      'Implemented sitemap, robots, custom 404, CSP and other security headers, and documented accessibility maintenance.',
      'Managed version control, production QA, and the GitHub-to-Netlify release workflow.'
    ],
    deliverables: [
      'Responsive multi-page company website',
      'Audience and service landing pages',
      'Five audience pathways: families, OFWs, seafarers, professionals, and business owners',
      'Needs-check and consultation conversion journeys',
      'Netlify Forms with accessible validation and honeypot protection',
      'GA4 page views and successful-lead tracking',
      'Sitemap, robots, custom 404, and security headers',
      'GitHub-to-Netlify deployment workflow'
    ],
    outcome:
      'Delivered a 29-page public website with audience-specific service pathways, two lead-capture journeys, production forms, analytics, SEO infrastructure, security headers, and a repeatable GitHub-to-Netlify release workflow.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Netlify Forms', 'GA4', 'GitHub', 'Netlify'],
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
      'Evidence is limited to public repository and website behavior. The gallery excludes lead records, analytics-account details, and other private business information.',
    featured: true,
    caseStudyFocus: 'frontend',
    proofPoints: [
      { value: '29', label: 'indexed pages in the sitemap' },
      { value: '5', label: 'principal audience pathways' },
      { value: '2', label: 'primary conversion journeys' },
      { value: 'GA4', label: 'page views + confirmed leads' }
    ],
    conversionFlow: ['Visitor', 'Audience or service page', 'Needs check or consultation', 'Netlify form', 'Thank-you state', 'GA4 generate_lead'],
    technicalDecisions: [
      {
        title: 'Intent-based information architecture',
        detail: 'Audience and service paths help visitors start from the need they recognize instead of navigating an exclusively product-led catalog.'
      },
      {
        title: 'Static frontend for predictable delivery',
        detail: 'HTML, CSS, and JavaScript keep deployment overhead low while supporting responsive layouts, forms, analytics, and SEO infrastructure.'
      },
      {
        title: 'Measure completed leads, not intent clicks',
        detail: '`generate_lead` is recorded after a successful conversion rather than when a visitor merely activates a CTA.'
      },
      {
        title: 'Accessibility in interaction details',
        detail: 'Navigation state, inline errors, first-invalid-field focus, visible contrast, and flexible partner-logo layouts are maintained as part of frontend QA.'
      },
      {
        title: 'Compliance-conscious service explanations',
        detail: 'Disclosures clarify that Avodah provides guidance and assistance but does not directly lend, underwrite, approve products, or guarantee outcomes.'
      }
    ],
    validation: [
      'Verified 29 public URLs in the repository sitemap.',
      'Reviewed Netlify form detection attributes, honeypots, required-field validation, accessible error states, and thank-you handling.',
      'Verified GA4 page-view configuration and `generate_lead` execution in the public source without claiming GTM, Meta Pixel, or Search Console.',
      'Reviewed CSP, permissions, referrer, frame, and content-type headers in `netlify.toml`.',
      'Maintained an accessibility fix record covering navigation state, contrast, label spacing, flexible logo layouts, footer containment, and form behavior.'
    ],
    gallery: [
      {
        src: '/assets/avodah-home-desktop.jpg',
        alt: 'Desktop homepage of the Avodah Wealth Advisory website',
        caption: 'Desktop homepage — audience framing, service pathways, trust context, and primary conversion choices.',
        width: 1424,
        height: 900
      },
      {
        src: '/assets/avodah-mobile-navigation.jpg',
        alt: 'Avodah Wealth Advisory mobile navigation opened over the homepage',
        caption: 'Mobile navigation — explicit expanded state and direct access to the needs check and consultation path.',
        width: 375,
        height: 811
      },
      {
        src: '/assets/avodah-needs-check.jpg',
        alt: 'Avodah Wealth Advisory needs-check form flow',
        caption: 'Needs-check journey — structured qualifying questions, accessible progress context, consent, and honeypot-protected Netlify handling.',
        width: 1424,
        height: 1318
      },
      {
        src: '/assets/avodah-consultation-form.jpg',
        alt: 'Avodah Wealth Advisory consultation request page and form',
        caption: 'Consultation journey — direct contact options, labeled fields, disclosures, validation, and a dedicated confirmation route.',
        width: 1424,
        height: 1671
      }
    ]
  },
  {
    slug: 'project-handoff',
    index: '02',
    title: 'Project Handoff',
    category: 'Landing Page · B2B SaaS Concept · Conversion Engineering',
    summary:
      'A fictional B2B SaaS waitlist concept designed and built as a complete conversion-focused landing page with a production form, consent-aware analytics, accessibility, SEO, and documented design decisions.',
    engagement: 'Independent frontend portfolio concept',
    scope:
      'Product brief, content architecture, responsive visual system, waitlist conversion, privacy and thank-you routes, analytics contract, deployment, and QA.',
    ownership:
      'Product framing, copy structure, interface design, Astro implementation, CSS, form behavior, analytics, documentation, and release validation.',
    operationalOutcome:
      'An inspectable end-to-end landing-page sample built around one truthful private-beta conversion.',
    challenge:
      'The sample needed to demonstrate conversion-focused frontend execution without relying on fabricated customer logos, testimonials, user counts, or performance claims.',
    approach:
      'I framed a specific recurring-work problem for agencies and consultancies, mapped one primary conversion from hero to waitlist, documented the visual and content decisions, and implemented the experience as a lightweight Astro static site.',
    contributions: [
      'Created the product brief, content map, visual tokens, component states, responsive annotations, decision log, and QA checklist.',
      'Built the semantic landing-page sequence, CSS product illustration, responsive navigation, native FAQ disclosures, privacy notice, thank-you route, and custom 404.',
      'Implemented a three-field Netlify Forms waitlist with honeypot protection, accessible inline validation, loading/error/success states, consent text, and first-invalid-field focus.',
      'Implemented GA4 consent denied by default, then limited events to CTA placement, form start, form errors without field values, and confirmed `sign_up`.',
      'Verified production output, internal links, keyboard behavior, error states, reduced-motion behavior, and horizontal overflow across five target widths.'
    ],
    deliverables: [
      'Responsive B2B SaaS landing page',
      'Private-beta waitlist conversion',
      'Privacy, thank-you, and 404 routes',
      'Inspectable design-process documentation',
      'Consent-aware GA4 event contract',
      'Netlify-ready production configuration'
    ],
    outcome:
      'Delivered an honest, inspectable landing-page sample that connects positioning, interface design, form handling, measurement, accessibility, SEO, and deployment into one conversion path.',
    tools: ['Astro', 'HTML', 'Custom CSS', 'JavaScript', 'Netlify Forms', 'GA4', 'GitHub', 'Netlify'],
    image: '/assets/project-handoff-preview.jpg',
    imageAlt: 'Project Handoff landing-page hero and product workflow illustration',
    imageWidth: 1424,
    imageHeight: 900,
    socialImage: '/assets/project-handoff-preview.jpg',
    liveNote: 'Fictional portfolio concept — no commercial customers, traction, testimonials, or performance claims are presented.',
    evidenceNote: 'The public repository documents the brief, content map, design system, decisions, QA criteria, implementation, and release evidence.',
    featured: true,
    caseStudyFocus: 'frontend',
    proofPoints: [
      { value: '1', label: 'primary conversion path' },
      { value: '3', label: 'purpose-limited form fields' },
      { value: '4', label: 'privacy-safe GA4 events' },
      { value: '5', label: 'responsive widths verified' }
    ],
    conversionFlow: ['Visitor', 'Problem and workflow', 'Use-case fit', 'Waitlist form', 'Netlify success', 'GA4 sign_up'],
    technicalDecisions: [
      { title: 'One primary conversion', detail: 'Every major CTA returns to the private-beta waitlist instead of splitting attention across demo, pricing, and contact paths.' },
      { title: 'Static Astro with custom CSS', detail: 'The site ships semantic HTML and a small interaction layer while keeping the responsive visual system directly inspectable.' },
      { title: 'Form values stay out of analytics', detail: 'GA4 receives placement, state, method, and error category only—never email addresses, team size, or workflow answers.' },
      { title: 'Consent before measurement', detail: 'Analytics storage is denied by default and the GA script does not load until a visitor explicitly opts in.' },
      { title: 'Native controls where possible', detail: 'The FAQ uses `details`/`summary`; form fields use native validity with custom accessible errors; motion respects the user’s reduced-motion setting.' }
    ],
    validation: [
      'Astro production build generates four routes with no broken internal links.',
      'No horizontal overflow at 360, 390, 768, 1024, or 1440 px.',
      'Mobile navigation exposes expanded state, closes with Escape, and restores a stable closed state.',
      'Invalid submission marks all required controls and focuses the work-email field first.',
      'Declining analytics leaves the Google tag script unloaded.'
    ]
  },
  {
    slug: 'jc-portfolio',
    index: '03',
    title: 'JC Professional Portfolio',
    category: 'Astro Frontend · Accessibility · Cloudflare Delivery',
    summary:
      'A production Astro portfolio built as a responsive, accessible evidence system with project routes, image proof, structured metadata, automated quality checks, and Cloudflare deployment.',
    engagement: 'Independent portfolio product',
    scope: 'Information architecture, Astro components, responsive UI, accessibility, SEO, build validation, GitHub workflows, and Cloudflare delivery.',
    ownership: 'Frontend architecture, implementation, content modeling, QA automation, deployment configuration, and ongoing maintenance.',
    operationalOutcome: 'A public evidence system that supports both a broad operations profile and a dedicated frontend application path.',
    challenge: 'The portfolio needed to organize different kinds of professional evidence without turning the homepage into a generic skills list or forcing every case study into the same narrative.',
    approach: 'I separated reusable project data from page rendering, built specialist routing where positioning differs, and treated keyboard behavior, reduced motion, safe-area handling, metadata, and release checks as part of the product.',
    contributions: [
      'Built the static Astro page and component architecture with reusable project data.',
      'Implemented responsive navigation, visible focus, reduced-motion support, lightbox behavior, and mobile safe-area handling.',
      'Added canonical and social metadata, structured data, sitemap generation, favicon assets, and image-dimension checks.',
      'Configured GitHub quality checks and Cloudflare static delivery with a separate event endpoint for portfolio CTA measurement.'
    ],
    deliverables: ['Responsive portfolio', 'Reusable case-study renderer', 'Frontend-specific entry route', 'Automated build and content checks', 'Cloudflare deployment configuration'],
    outcome: 'Delivered and maintained a production portfolio whose positioning, evidence, and release controls can evolve without replacing its broader professional narrative.',
    tools: ['Astro', 'HTML', 'CSS', 'JavaScript', 'GitHub Actions', 'Cloudflare Workers'],
    image: '/assets/og-default.svg',
    imageAlt: 'Joshua Carl Pelotea professional portfolio social preview',
    imageWidth: 1200,
    imageHeight: 630,
    socialImage: '/assets/og-default.svg',
    live: 'https://portfolio.jcpelotea.workers.dev/',
    liveLabel: 'Open portfolio ↗',
    github: 'https://github.com/Jpelotea/jc-professional-portfolio',
    featured: true,
    caseStudyFocus: 'frontend',
    proofPoints: [
      { value: 'Astro', label: 'static component architecture' },
      { value: 'WCAG', label: 'keyboard and motion basics' },
      { value: 'CI', label: 'automated portfolio checks' },
      { value: 'Edge', label: 'Cloudflare delivery' }
    ],
    technicalDecisions: [
      { title: 'Data-driven case studies', detail: 'Reusable project fields keep summaries, proof, validation, tools, and frontend-specific evidence consistent across listings and detail routes.' },
      { title: 'Specialist route, stable homepage', detail: 'The `/frontend/` entry point supports a targeted application without rewriting the broader operations-led homepage.' },
      { title: 'Progressive interaction layer', detail: 'Navigation, lightbox, theme, and motion behaviors enhance static content while preserving a usable HTML baseline.' }
    ],
    validation: [
      'Astro check and production build run in the portfolio quality workflow.',
      'Automated checks cover internal links, image dimensions, external links, and structured data.',
      'Desktop and mobile visual QA confirm responsive navigation and no horizontal overflow.'
    ]
  },
  {
    slug: 'openready',
    index: '04',
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
    index: '05',
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
    index: '06',
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
