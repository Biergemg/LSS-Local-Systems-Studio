import type { Metadata } from 'next';
import LegalPage from '@/components/ui/LegalPage';
import { CONTACT } from '@/data/content';

export const metadata: Metadata = {
  title: 'Aviso de privacidad | LSS',
  description: 'Cómo trata LSS la información que compartes al contactarnos.',
  alternates: { canonical: '/privacidad' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage title="Aviso de privacidad" updated="29 de octubre de 2026">
      <h2>Quién trata tus datos</h2>
      <p>LSS — Local Systems Studio. Para cualquier asunto de privacidad escríbenos a <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> o por WhatsApp al {CONTACT.whatsapp}.</p>
      <h2>Qué información recibimos</h2>
      <p>Este sitio no tiene formularios ni cuentas. Recibimos información solo cuando decides escribirnos por WhatsApp o por correo: tu nombre, ciudad, servicio y lo que quieras compartir. La demostración «Prueba de la Primera Visita» funciona en tu navegador: lo que escribes en ella no se envía ni se guarda hasta que tú abres WhatsApp y envías el mensaje.</p>
      <h2>Para qué la usamos</h2>
      <p>Para responderte, preparar tu revisión inicial y, si decides contratar, elaborar tu propuesta.</p>
      <h2>WhatsApp y otros servicios</h2>
      <p>Al pulsar un botón de WhatsApp se abre ese servicio, que tiene sus propias condiciones y su propio aviso de privacidad. Lo mismo ocurre con Instagram y Facebook.</p>
      <h2>Medición</h2>
      <p>El sitio puede cargar una herramienta de medición de Meta (Pixel) únicamente cuando LSS la activa y siempre con el consentimiento que corresponda. Si está activa, se informa aquí.</p>
      <h2>Tus derechos</h2>
      <p>Puedes pedir acceso, rectificación, cancelación u oposición al tratamiento de tus datos, y revocar tu consentimiento, escribiendo al correo indicado.</p>
    </LegalPage>
  );
}
