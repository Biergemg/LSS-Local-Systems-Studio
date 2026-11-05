import { CONTACT, FAQ_ITEMS, SITE, SOCIALS } from '@/data/content';

/* Solo datos verificables: sin horario, dirección postal, valoraciones ni precios no aprobados. */
const ORG_ID = `${SITE.url}/#organization`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: SITE.name,
  alternateName: 'LSS',
  description:
    'Sitio web, ficha de Google, WhatsApp y agenda para clínicas y negocios que atienden por cita. Servicio a distancia en México.',
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}/og-image.png`,
  telephone: CONTACT.phone,
  email: CONTACT.email,
  areaServed: { '@type': 'Country', name: 'México' },
  sameAs: SOCIALS.map((s) => s.href),
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  inLanguage: 'es-MX',
  publisher: { '@id': ORG_ID },
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};
