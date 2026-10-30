import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/ui/LegalPage';
import { CONTACT } from '@/data/content';
import { GA_ID } from '@/lib/analytics';

export const metadata: Metadata = {
  title: 'Aviso de privacidad | LSS',
  description: 'Tratamiento de datos, derechos ARCO, contacto y tecnologías del sitio de Local Systems Studio.',
  alternates: { canonical: '/privacidad' },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Aviso de privacidad" updated="30 de octubre de 2026">
      <p className="legal-intro">Este aviso explica cómo LSS — Local Systems Studio maneja información personal recibida mediante su sitio web, comunicaciones comerciales y proyectos de servicios digitales. Aplica a las personas que nos escriben, solicitan una revisión, piden una propuesta o mantienen una relación de servicio con nosotros.</p>

      <h2>1. Responsable y vías de contacto</h2>
      <p>El responsable de las actividades descritas en este sitio se presenta comercialmente como <strong>LSS — Local Systems Studio</strong>, con operación en México y atención a distancia. Para solicitudes sobre privacidad, derechos de los titulares y notificaciones relacionadas con datos personales, escribe a <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a>. También puedes contactarnos en {CONTACT.whatsapp}. En las propuestas y contratos individuales se identificará al prestador que asume la relación contractual.</p>
      <p>Cuando se formalice una relación de servicios, la propuesta y el acuerdo particular identificarán al prestador responsable y su domicilio para notificaciones. Para recibir esa información en relación con una solicitud concreta puedes escribir al medio de contacto indicado.</p>

      <h2>2. Datos que podemos tratar</h2>
      <p>Según tu interacción, podemos tratar tu nombre, empresa y cargo, ciudad o área de servicio, número telefónico, correo electrónico, enlaces públicos que compartas, servicios que te interesan, contenido de conversaciones y archivos que nos envíes; así como datos de facturación y contratación cuando corresponda. Nuestros proveedores de alojamiento también pueden tratar información técnica necesaria para prestar el sitio, como dirección IP, fecha, tipo de navegador y registros de seguridad.</p>
      <p>La Primera Visita Digital consiste en revisar información que tu negocio muestra públicamente en Internet y materiales que compartes para ese fin. Este sitio <strong>no contiene un simulador</strong> que recabe el nombre de un negocio ni un formulario de captura propio: el botón de contacto abre WhatsApp y el mensaje se envía solo si tú decides enviarlo.</p>
      <p>No solicitamos datos sensibles (por ejemplo, salud, biometría, origen racial, creencias o información financiera privada) mediante este sitio. Evita enviarlos por WhatsApp o correo. Si un proyecto excepcionalmente los requiriera, el tratamiento deberá definirse por separado con las autorizaciones y salvaguardas correspondientes.</p>

      <h2>3. Finalidades necesarias</h2>
      <ul>
        <li>Responder consultas y solicitudes de Primera Visita Digital; verificar los datos necesarios para dar seguimiento.</li>
        <li>Analizar la presencia digital que nos indiques, preparar observaciones y propuestas solicitadas.</li>
        <li>Evaluar factibilidad, negociar, formalizar, ejecutar, administrar y dar soporte a los servicios contratados.</li>
        <li>Coordinar accesos delegados autorizados y comunicarnos sobre entregables, pagos, cambios y continuidad.</li>
        <li>Atender solicitudes de derechos, seguridad, reclamaciones y obligaciones legales, contables o fiscales.</li>
        <li>Prevenir abusos y mantener el funcionamiento y seguridad del sitio y las comunicaciones.</li>
      </ul>
      <p>Estas finalidades se relacionan con tus solicitudes, una relación contractual o medidas precontractuales y, cuando la ley lo requiere, con el consentimiento correspondiente.</p>

      <h2>4. Finalidades opcionales y publicidad</h2>
      <p>Solo con la autorización que corresponda podremos utilizar tus datos para campañas, comunicaciones promocionales no solicitadas, medición publicitaria no esencial o creación de audiencias. Puedes negarte a estas finalidades sin impedir que respondamos una solicitud o prestemos un servicio contratado. Para pedir la exclusión comercial o retirar una autorización, escribe al correo indicado con el asunto <strong>«Oposición a publicidad»</strong>.</p>
      <p>No enviamos campañas de WhatsApp o correo comercial por el solo hecho de que hayas visitado esta página o solicitado información.</p>

      <h2 id="cookies">5. Cookies, analítica y tecnologías de terceros</h2>
      <p>El alojamiento y la seguridad pueden emplear identificadores técnicos necesarios para servir o proteger el sitio. Los enlaces a WhatsApp, Instagram o Facebook llevan a plataformas externas; su tratamiento se rige también por sus propios avisos.</p>
      {GA_ID && (
        <>
          <p><strong>Medición con Google Analytics 4.</strong> Este sitio mide visitas con Google Analytics 4 (Google LLC y, para el Espacio Económico Europeo, Google Ireland Limited) <strong>solo si eliges «Permitir medición»</strong>. Antes de tu elección no se solicita ningún recurso de Google Analytics. Si lo permites, se instalan las cookies <code>_ga</code> y <code>_ga_</code> seguida del identificador de la propiedad (duración máxima de 2 años) y se registran las páginas que ves y, como eventos, los clics en enlaces de WhatsApp, teléfono o correo, junto con el canal y la sección de la página donde ocurrieron, así como los envíos de formularios cuando existan. Una señal denominada <code>contact_intent</code> agrupa el clic en esos enlaces; no demuestra que se haya enviado un mensaje ni que se haya concretado una venta. No se envía a Google el contenido de tus mensajes, tu número de teléfono ni tu nombre. Un clic en WhatsApp no equivale a un mensaje recibido ni a un cliente.</p>
          <p>Google puede recibir tu dirección IP y datos técnicos de tu dispositivo para prestar el servicio y procesarlos fuera de México. Desactivamos las señales de Google y la personalización de anuncios, y configuramos la conservación de los datos de eventos en 14 meses. Puedes cambiar o retirar tu decisión en cualquier momento desde <strong>«Preferencias de privacidad»</strong> en el pie de página; al retirarla se eliminan las cookies de Analytics de este sitio. Rechazar la medición no limita la navegación ni el contacto.</p>
        </>
      )}
      <p>Cuando el sitio tenga habilitada una herramienta publicitaria como Meta Pixel, se cargará únicamente después de tu elección afirmativa en el control de preferencias; rechazarla no impedirá navegar. Si no se habilita esta herramienta, no se presenta una autorización publicitaria ficticia. Puedes cambiar tu decisión desde el enlace <strong>«Preferencias de privacidad»</strong> del pie de página, cuando esté disponible.</p>
      <p>Las mediciones técnicas de desempeño realizadas por herramientas de desarrollo no son, por sí mismas, una autorización para instalar rastreadores publicitarios en tu navegador.</p>

      <h2>6. Proveedores, transferencias y operación internacional</h2>
      <p>Para prestar el sitio y atender comunicaciones pueden intervenir proveedores de alojamiento y seguridad (como Vercel), servicios de correo{GA_ID ? ', Google (Analytics, solo si lo permites)' : ''} y las plataformas a las que decidas escribirnos (como WhatsApp/Meta). Pueden procesar datos en otros países según su infraestructura y condiciones. Procuramos que su acceso sea limitado a la prestación correspondiente, mediante medidas y acuerdos aplicables.</p>
      <p>No comercializamos bases de datos personales. Cualquier comunicación a un tercero para finalidades propias distinta de la prestación de servicios o de los supuestos permitidos por ley requerirá la información y, cuando proceda, el consentimiento correspondiente. También podremos comunicar datos por obligación legal, petición de autoridad competente, defensa de derechos o ejecución de una relación contractual cuando lo permita la normativa aplicable.</p>
      <p>Si LSS trata datos por cuenta de un cliente, por ejemplo al gestionar su sitio, perfil o comunicaciones, los papeles de responsable y encargado, instrucciones, medidas de seguridad, subencargados, transferencias y devolución o eliminación de datos se establecerán en los documentos de ese proyecto. La información del cliente no se transforma automáticamente en una base de prospectos de LSS.</p>

      <h2>7. Conservación, protección e incidentes</h2>
      <p>Conservamos datos mientras sean necesarios para responder y realizar las finalidades comunicadas; después se eliminan, anonimizan o bloquean, salvo conservación exigida para contratos, contabilidad, obligaciones fiscales o reclamaciones. Los periodos aplicables dependen de la naturaleza de cada registro y de la legislación correspondiente.</p>
      <p>Aplicamos controles proporcionados de acceso, confidencialidad y seguridad a los medios bajo nuestro control. Ningún sistema conectado a Internet puede prometer ausencia absoluta de incidentes. Ante una vulneración que afecte significativamente tus derechos patrimoniales o morales, realizaremos las comunicaciones que exija la legislación aplicable.</p>

      <h2>8. Tus derechos ARCO y revocación del consentimiento</h2>
      <p>Puedes solicitar <strong>acceso, rectificación, cancelación u oposición</strong> al tratamiento de tus datos, así como revocar un consentimiento cuando legalmente proceda o pedir que limitemos su utilización. Escribe a <a href={'mailto:' + CONTACT.email + '?subject=Derechos%20ARCO'}>{CONTACT.email}</a> con el asunto <strong>«Derechos ARCO»</strong>.</p>
      <p>Indica tu nombre, un medio de respuesta, el derecho o petición que deseas ejercer y una descripción suficiente de los datos implicados. Para proteger tu información podremos verificar tu identidad o representación por un medio proporcional y seguro; evita remitir identificaciones completas sin que te indiquemos un canal adecuado.</p>
      <p>De acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, comunicaremos la determinación en un máximo de <strong>20 días hábiles</strong> desde la recepción de la solicitud y, cuando resulte procedente, la haremos efectiva en los <strong>15 días hábiles</strong> siguientes a la respuesta; los plazos pueden ampliarse en los supuestos previstos por la ley. El ejercicio de derechos es gratuito, salvo los costos de reproducción o envío legalmente permitidos. La cancelación y revocación pueden tener excepciones cuando debamos conservar datos por una obligación legal o contractual.</p>
      <p>Para inconformidades con la atención de estos derechos puedes acudir a la <strong>Secretaría Anticorrupción y Buen Gobierno</strong>, autoridad competente conforme al marco mexicano vigente.</p>

      <h2>9. Menores de edad y enlaces externos</h2>
      <p>Nuestros servicios comerciales se dirigen a personas con capacidad para solicitar servicios profesionales. No buscamos deliberadamente información de menores; si detectamos una comunicación no autorizada de esta naturaleza, adoptaremos las medidas que correspondan.</p>
      <p>Los enlaces externos se ofrecen para facilitar el contacto y consulta de plataformas. Cada tercero controla su propia plataforma y sus prácticas de privacidad.</p>

      <h2>10. Personas ubicadas fuera de México</h2>
      <p>La atención remota puede involucrar personas o negocios de otros países. Respetaremos las normas de protección de datos que resulten obligatorias por el alcance real de las actividades. Si una operación está sujeta al Reglamento General de Protección de Datos de la Unión Europea, se habilitarán los derechos, información y mecanismos que exija ese régimen; la mera disponibilidad mundial de este sitio no supone que todos los tratamientos estén sujetos a la misma legislación.</p>

      <h2>11. Actualizaciones de este aviso</h2>
      <p>Publicaremos la versión vigente y su fecha en esta misma dirección. Si una modificación requiere aviso directo o consentimiento adicional por disposición aplicable, utilizaremos un medio adecuado antes de realizar el tratamiento correspondiente. Los cambios no legitiman retroactivamente tratamientos previos.</p>
      <p>También puedes consultar nuestros <Link href="/terminos">Términos de uso</Link>.</p>
    </LegalPage>
  );
}
