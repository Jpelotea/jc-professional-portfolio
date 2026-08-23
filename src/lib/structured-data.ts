import type { Project } from '../data/projects';
import { site } from '../site.config';

export type StructuredData = Record<string, unknown>;

export const personId = `${site.url}/#person`;
export const websiteId = `${site.url}/#website`;

export const personStructuredData: StructuredData = {
  '@type': 'Person',
  '@id': personId,
  name: site.name,
  alternateName: site.professionalName,
  url: site.url,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  sameAs: [
    site.social.linkedin,
    site.social.github,
    site.social.freelancer,
    site.social.facebook
  ]
};

export const websiteStructuredData: StructuredData = {
  '@type': 'WebSite',
  '@id': websiteId,
  url: site.url,
  name: 'JC Pelotea Professional Portfolio',
  description: site.description,
  inLanguage: 'en',
  about: { '@id': personId }
};

export const profilePageStructuredData: StructuredData = {
  '@type': 'ProfilePage',
  '@id': `${site.url}/about/#profile-page`,
  url: `${site.url}/about/`,
  name: `About ${site.name} (${site.professionalName})`,
  isPartOf: { '@id': websiteId },
  mainEntity: { '@id': personId }
};

export const breadcrumbStructuredData = (
  items: Array<{ name: string; path: string }>
): StructuredData => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: new URL(item.path, site.url).toString()
  }))
});

export const caseStudyStructuredData = (project: Project): StructuredData => {
  const url = `${site.url}/work/${project.slug}/`;
  const sameAs = [project.live, project.github].filter(Boolean);

  return {
    '@type': 'CreativeWork',
    '@id': `${url}#case-study`,
    url,
    name: project.title,
    description: project.summary,
    creator: { '@id': personId },
    author: { '@id': personId },
    isPartOf: { '@id': websiteId },
    about: project.category,
    keywords: project.tools.join(', '),
    ...(project.image ? { image: new URL(project.image, site.url).toString() } : {}),
    ...(sameAs.length ? { sameAs } : {})
  };
};
