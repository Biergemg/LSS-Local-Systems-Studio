import type { Metadata } from 'next';
import LegalPage from '@/components/ui/LegalPage';
import { CONTACT } from '@/data/content';

export const metadata: Metadata = {
  title: 'Términos de uso | LSS',
  description: 'Condiciones de uso del sitio de LSS.',
  alternates: { canonical: '/terminos' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage title="Términos de uso" updated="29 de octubre de 2026">
      <h2>Sobre este sitio</h2>
      <p>Este sitio presenta los servicios de LSS — Local Systems Studio. Los contenidos de diseño, texto e ilustraciones son de LSS.</p>
      <h2>La demostración</h2>
      <p>La Prueba de la Primera Visita es una demostración creativa que compone una presentación con los datos que escribes. Las marcas de ejemplo (como «Casa Arroyo») son ficticias y creadas por LSS.</p>
      <h2>Propuestas y servicios</h2>
      <p>El alcance, los plazos, la inversión y las condiciones de cada proyecto se definen en una propuesta y un contrato por escrito. Nada de lo publicado aquí sustituye a esos documentos.</p>
      <h2>Contacto</h2>
      <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> · WhatsApp {CONTACT.whatsapp}</p>
    </LegalPage>
  );
}
