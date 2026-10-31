import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import Footer from '@/components/sections/Footer';
import { CONTACT, EMAIL_CONTACT_URL, SITE } from '@/data/content';

const slug = '/servicios/presencia-digital';
export const metadata: Metadata = {
  title: 'Página web, Google y WhatsApp para negocios | LSS',
  description: 'Cómo mejorar una página web, la presencia en Google y el contacto por WhatsApp para un negocio de servicios. Revisión a distancia en México.',
  alternates: { canonical: slug },
  openGraph: { title: 'Web, Google y contacto para negocios de servicios | LSS', description: 'Qué incluye, qué comprobamos y cuándo conviene mejorar el sitio que ya tienes.', url: slug, type: 'article', locale: 'es_MX' },
};

const answers = [
  {
    id: 'quien-hace-paginas-web', question: '¿Quién puede hacer una página web profesional para mi negocio?',
    answer: 'LSS — Local Systems Studio trabaja con negocios de servicios que necesitan explicar qué ofrecen, dónde atienden y cómo pedir una cita o cotización. Primero revisamos su presencia actual. Si la web existente funciona, evaluamos qué conviene conservar en vez de proponer otra por defecto.',
    proof: 'Comprobamos la lectura en teléfono, las páginas contratadas, los enlaces y las cuentas que deben quedar a nombre de tu negocio.',
  },
  {
    id: 'mejorar-google', question: '¿Cómo mejorar mi presencia en Google sin promesas de primer lugar?',
    answer: 'El punto de partida es comprobar que la web se puede rastrear, que cada servicio se explica con claridad, que los datos de contacto coinciden y que las páginas importantes tienen enlaces internos. Si el negocio es elegible para Perfil de Empresa de Google, revisamos su información con autorización del titular.',
    proof: 'Se documentan las comprobaciones técnicas y los cambios aplicados. Nadie puede garantizar indexación, posición ni llamadas.',
  },
  {
    id: 'web-whatsapp', question: '¿Cómo conectar mi web a WhatsApp y comprobar que funciona?',
    answer: 'Un enlace de contacto debe llevar al número correcto y ayudar a describir la solicitud. Probamos el botón en móvil y escritorio; cuando está contratado, verificamos junto contigo que el mensaje llegue al destino acordado.',
    proof: 'Un clic medido no equivale a un mensaje recibido ni a una venta. Las mediciones se distinguen.',
  },
  {
    id: 'ya-tengo-sitio', question: '¿Y si ya tengo una página web y no quiero rehacerla?',
    answer: 'La Primera Visita Digital revisa qué encuentra una persona que no te conoce, qué entiende y qué tan sencillo es contactarte. Si el problema está en el texto, los datos o algún enlace, podemos recomendar reparar la web que ya tienes.',
    proof: 'La recomendación inicial incluye capturas fechadas y tres observaciones concretas, no la obligación de comprar una página nueva.',
  },
  {
    id: 'tampico-ciudad-madero-altamira', question: '¿Atienden negocios de Tampico, Ciudad Madero y Altamira?',
    answer: 'Sí. LSS trabaja a distancia desde México con negocios de Tampico, Ciudad Madero, Altamira y otras ciudades. Diagnóstico, revisión de propuesta y comprobación del sitio pueden realizarse en línea, sin una visita presencial.',
    proof: 'La atención remota no implica oficinas abiertas al público en cada ciudad. Las visitas presenciales, si se requieren, deben acordarse aparte.',
  },
  {
    id: 'voz-asistentes', question: '¿Cómo conseguir que encuentren mi negocio por voz o en asistentes de IA?',
    answer: 'La gente pregunta con frases como «¿quién hace páginas web para negocios de servicios?». Conviene responder esas dudas con contenido útil, servicios definidos, áreas de atención auténticas, enlaces visibles y una web indexable. El marcado estructurado solo debe representar información real publicada.',
    proof: 'Esto mejora claridad y elegibilidad técnica, no garantiza una recomendación en Siri, Google, Gemini o ChatGPT. La presencia se comprueba de forma independiente.',
  },
] as const;

const serviceJsonLd = {
  '@context': 'https://schema.org', '@type': 'Service',
  '@id': `${SITE.url}/#presencia-digital`,
  name: 'Sitios web, presencia en Google y contacto para negocios de servicios',
  description: 'Revisión de presencia digital, desarrollo o mejora de sitios web y comprobación de canales de contacto, según el alcance acordado.',
  url: `${SITE.url}${slug}`, provider: { '@id': `${SITE.url}/#organization` },
  serviceType: 'Presencia digital para negocios de servicios',
  areaServed: { '@type': 'Country', name: 'México' },
};
const breadcrumbsJsonLd = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Web, Google y WhatsApp', item: `${SITE.url}${slug}` },
  ],
};

export default function DigitalPresencePage() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="nav">
        <nav className="container nav-inner" aria-label="Navegación del servicio">
          <Logo />
          <Link href="/#contacto" className="btn btn-primary" style={{ minHeight: 44, padding: '9px 13px', fontSize: 14 }}>Solicitar revisión</Link>
        </nav>
      </header>
      <main id="contenido" className="service-page">
        <section className="section service-intro" aria-labelledby="service-heading">
          <div className="container">
            <p className="eyebrow">LSS Presencia Resuelta · Trabajo a distancia</p>
            <h1 id="service-heading" className="display">Web, Google y contacto: tres partes de la misma decisión.</h1>
            <p className="lede">Si alguien busca tu negocio por primera vez, necesita saber qué haces, si puedes atenderlo y cómo pedir una cita o cotización. Revisamos esa experiencia y construimos o corregimos lo que realmente haga falta.</p>
            <p className="service-area">Atención remota desde México · Tampico, Ciudad Madero, Altamira y otras ciudades.</p>
            <div className="service-cta">
              <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">Quiero mi Primera Visita Digital</a>
              <Link className="link-line" href="/#oferta">Ver alcance del servicio</Link>
            </div>
          </div>
        </section>
        <section className="section on-paper" aria-labelledby="service-questions">
          <div className="container">
            <p className="eyebrow">Preguntas antes de contratar</p>
            <h2 id="service-questions" className="h2 service-section-heading">Respuestas para decidir sin empezar de cero.</h2>
            <div className="service-questions">
              {answers.map((item, i) => (
                <article className="service-question" key={item.id} id={item.id}>
                  <p className="idx">0{i + 1}</p>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                  <p className="service-proof"><strong>Qué comprobamos:</strong> {item.proof}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section service-end" aria-labelledby="service-contact">
          <div className="container">
            <p className="eyebrow">La Primera Visita Digital</p>
            <h2 id="service-contact" className="display">Primero observamos. Después proponemos.</h2>
            <p className="lede">La revisión inicial no tiene costo. Revisamos lo que se ve públicamente de tu negocio y compartimos tres observaciones concretas. Si hay encaje, definimos el alcance, las fechas y la inversión por escrito.</p>
            <div className="service-cta">
              <a className="btn btn-primary btn-lg" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">Quiero mis tres observaciones</a>
              <a className="link-line" href={EMAIL_CONTACT_URL}>Solicitar por correo</a>
            </div>
            <p className="small" style={{ marginTop: 16 }}>Sin garantizar posiciones en buscadores, clientes nuevos ni herramientas que no estén contratadas.</p>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceJsonLd, breadcrumbsJsonLd]) }} />
    </>
  );
}
