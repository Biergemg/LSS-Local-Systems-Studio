import { FAQS, SITE, CONTACT } from '@/data/content';

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  email: CONTACT.email,
  telephone: CONTACT.whatsapp,
  areaServed: { '@type': 'Country', name: 'México' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tampico',
    addressCountry: 'MX',
  },
  contactPoint: [{
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: CONTACT.whatsapp,
    areaServed: 'MX',
    availableLanguage: ['es-MX'],
  }],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: 'es-MX',
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};
