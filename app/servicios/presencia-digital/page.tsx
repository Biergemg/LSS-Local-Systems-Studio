import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import { CONTACT, SITE } from '@/data/content';

const slug = '/servicios/presencia-digital';
export const metadata: Metadata = {
  title: 'Página web, Google y WhatsApp para negocios | LSS',
  description: 'Cómo mejorar una página web, la presencia en Google y el contacto por WhatsApp para un negocio de servicios. Revisión a distancia, en español, para México y otros países.',
  alternates: { canonical: slug },
  openGraph: { title: 'Web, Google y contacto para negocios de servicios | LSS', description: 'Cómo saber si tu sitio te cuesta citas, qué recibes en el diagnóstico y qué pasa con tus cuentas.', url: slug, type: 'article', locale: 'es_MX' },
};

const answers = [
  {
    id: 'cuesta-citas', question: '¿Cómo sé si mi sitio actual me está costando citas?',
    answer: 'Haz tres pruebas desde tu celular. Busca tu servicio y tu ciudad, a ver si apareces. Abre tu sitio y tu ficha de Google: en cinco segundos, ¿se entiende qué haces, dónde y cómo agendar? Intenta escribirte como si fueras un cliente nuevo: ¿lo logras en un solo paso? Si alguna falla, ahí se está perdiendo gente.',
    proof: 'Esas mismas tres pruebas son la base de tu diagnóstico, y te las devolvemos por escrito con lo que vimos.',
  },
  {
    id: 'que-recibo', question: '¿Qué recibo en el diagnóstico?',
    answer: 'Tres hallazgos sobre cómo te encuentran, cómo te entienden y cómo te contactan, el principal freno que vemos y un siguiente paso concreto. Trabajamos con lo que es público de tu negocio y con lo que nos cuentes por WhatsApp.',
    proof: 'Es sin costo y no obliga a contratar nada. Si tu sitio ya funciona, te lo decimos.',
  },
  {
    id: 'ya-tengo-sitio', question: '¿Rehacen mi página o arreglan la que ya tengo?',
    answer: 'Depende de lo que encontremos. Si la base sirve y el problema está en los textos, los datos de contacto o los enlaces, se corrige. Si no se ve bien en celular, no carga o no la puedes editar, conviene rehacerla. Si usas una agenda, tu sitio lleva un botón hacia ella.',
    proof: 'La recomendación llega por escrito y explica el porqué. No hay obligación de comprar una página nueva.',
  },
  {
    id: 'fuera-de-mexico', question: '¿Trabajan con negocios fuera de México?',
    answer: 'Sí. Todo se hace a distancia y en español: diagnóstico, propuesta, construcción y revisión. El horario de atención, la moneda y la forma de pago se acuerdan por escrito en tu propuesta antes de pagar nada.',
    proof: 'Algunas cosas dependen de tu país: si tu negocio puede tener ficha en Google y qué reglas aplican a lo que publicas. Lo revisamos contigo desde el diagnóstico.',
  },
  {
    id: 'mis-cuentas', question: '¿Qué pasa con mi dominio y mis cuentas?',
    answer: 'Tu dirección web, tu ficha de Google y tus accesos quedan a tu nombre. Nada se publica sin que lo apruebes, y revisas tu sitio en un enlace privado antes de que salga. Los cambios se juntan en una sola ronda.',
    proof: 'Alcance, tiempos, vigencia y renovación van por escrito en la propuesta, no en la conversación.',
  },
  {
    id: 'garantia-resultados', question: '¿Me garantizan pacientes o el primer lugar en Google?',
    answer: 'No, y desconfía de quien lo haga: depende de tu oferta, tu reputación y tu mercado. Lo que sí hacemos es dejar listo y probado el camino completo: que quien te busque te encuentre, entienda qué haces y pueda escribirte o agendar en un paso.',
    proof: 'Probamos el recorrido en celular y en computadora antes de entregarlo, y te mostramos el resultado.',
  },
] as const;

const serviceJsonLd = {
  '@context': 'https://schema.org', '@type': 'Service',
  '@id': `${SITE.url}/#presencia-digital`,
  name: 'Sitios web, presencia en Google y contacto para negocios de servicios',
  description: 'Revisión de presencia digital, desarrollo o mejora de sitios web y comprobación de canales de contacto, según el alcance acordado.',
  url: `${SITE.url}${slug}`, provider: { '@id': `${SITE.url}/#organization` },
  serviceType: 'Presencia digital para negocios de servicios',
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
      <Nav />
      <main id="contenido" className="service-page">
        <section className="section service-intro" aria-labelledby="service-heading">
          <div className="container">
            <p className="eyebrow">LSS · Trabajo a distancia</p>
            <h1 id="service-heading" className="display">Web, Google y contacto: tres partes de la misma decisión.</h1>
            <p className="lede">Si alguien busca tu negocio por primera vez, necesita saber qué haces, si puedes atenderlo y cómo pedir una cita o cotización. Revisamos esa experiencia y construimos o corregimos lo que realmente haga falta.</p>
            <p className="service-area">Trabajo a distancia y en español · México y otros países.</p>
            <div className="service-cta">
              <a className="btn btn-primary" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">Pedir mi diagnóstico</a>
              <Link className="link-line" href="/#servicio">Ver qué recibes</Link>
            </div>
          </div>
        </section>
        <section className="section on-paper" aria-labelledby="service-questions">
          <div className="container">
            <p className="eyebrow">Preguntas antes de contratar</p>
            <h2 id="service-questions" className="h2 service-section-heading">Lo que conviene saber antes de pedir tu diagnóstico.</h2>
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
            <p className="eyebrow">Pedir diagnóstico</p>
            <h2 id="service-contact" className="display">Cuéntanos de tu negocio.</h2>
            <p className="lede">Escríbenos por WhatsApp o por correo. Conversamos, revisamos lo que se ve públicamente de tu negocio y, si hay encaje, te enviamos una propuesta por escrito con alcance, fechas e inversión.</p>
            <div className="service-cta">
              <a className="btn btn-primary btn-lg" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">Pedir mi diagnóstico</a>
            </div>
            <p className="small" style={{ marginTop: 16 }}>No garantizamos posiciones en buscadores ni clientes nuevos; sí dejamos probado el camino de la búsqueda al mensaje.</p>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceJsonLd, breadcrumbsJsonLd]) }} />
    </>
  );
}
