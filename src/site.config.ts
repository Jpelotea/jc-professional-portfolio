export const site = {
  name: 'Joshua Carl Pelotea',
  shortName: 'JC Pelotea',
  professionalName: 'JC',
  title: 'Joshua Carl Pelotea (JC) | Business Operations & Executive Support',
  description:
    'Business Operations & Executive Support portfolio of Joshua Carl Pelotea (JC), featuring operations systems, workflow automation, documentation, digital projects, and marketing support.',
  url: 'https://portfolio.jcpelotea.workers.dev',
  role: 'Business Operations & Executive Support Specialist',
  compactRole: 'Business Operations & Executive Support',
  location: 'Butuan City, Philippines',
  availability:
    'Available for business operations, executive support, workflow improvement, and project-based digital operations engagements.',
  email: 'peloteajoshuacarl0@gmail.com',
  booking: 'https://calendar.app.google/Y2ZHPjRLXgX4YoJu5',
  social: {
    linkedin: 'https://www.linkedin.com/in/jcpelotea',
    github: 'https://github.com/Jpelotea',
    freelancer: 'https://www.freelancer.com/u/Jpel23',
    facebook: 'https://www.facebook.com/auhsoj.villafane',
    messenger: 'https://m.me/auhsoj.villafane',
    whatsapp: 'https://api.whatsapp.com/send?phone=639927190779',
    // Personal Viber numbers do not have a universal HTTPS click-to-chat URL.
    // viber.me/<number> requires that number to be registered as a Viber Business Account.
    viber: 'viber://chat?number=%2B639927190779',
    viberNumber: '+63 992 719 0779'
  }
} as const;

export const navigation = [
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Work', href: '/work/' },
  { label: 'Experience', href: '/#experience' },
  { label: 'About', href: '/about/' }
] as const;

export const coreTools = [
  'Google Workspace',
  'Google Sheets',
  'Apps Script',
  'GitHub',
  'Cloudflare',
  'Netlify',
  'Canva'
] as const;
