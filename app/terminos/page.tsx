import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/ui/LegalPage';
import { CONTACT } from '@/data/content';

export const metadata: Metadata = {
  title: 'Términos de uso del sitio | LSS',
  description: 'Reglas de uso del sitio, derechos de autor, información de servicios, propuestas, limitaciones y reclamaciones.',
  alternates: { canonical: '/terminos' },
};

export default function TermsPage() {
  return (
    <LegalPage title="Términos de uso del sitio web" updated="29 de octubre de 2026">
      <p className="legal-intro">Estos términos regulan el acceso y utilización del sitio <strong>www.lsslocalsystemsstudio.com</strong>, operado comercialmente bajo la marca <strong>LSS — Local Systems Studio</strong>. Su finalidad es informar de manera transparente las condiciones de navegación y de contacto. La contratación de un servicio profesional requiere una propuesta y un acuerdo específicos.</p>

      <h2>1. Identificación y alcance</h2>
      <p>LSS — Local Systems Studio presenta servicios de estrategia de comunicación digital, sitios web, presencia comercial en plataformas de terceros y rutas de contacto. Opera desde México y puede prestar servicios a distancia cuando el proyecto, los permisos y la normativa aplicable lo permitan.</p>
      <p>Consultas, solicitudes de revisión y conversaciones por WhatsApp o correo no generan por sí mismas un contrato, una reserva de capacidad, una relación de representación ni una obligación de ejecutar servicios. Las condiciones vinculantes de un proyecto serán las aceptadas expresamente en su cotización, contrato, orden de servicio y anexos aplicables.</p>

      <h2>2. Información comercial y ausencia de ofertas automáticas</h2>
      <p>Las descripciones, ilustraciones y explicaciones de metodología son informativas. Las características, alcances, integraciones, calendarios, infraestructura, permisos, precios, impuestos, hitos, garantías y renovaciones se concretarán por escrito antes de contratar. Una función anunciada de manera general no constituye un compromiso de instalación gratuita, inmediata o ilimitada.</p>
      <p>La <strong>Primera Visita Digital</strong> es una revisión inicial remota de hasta tres observaciones sobre la presencia pública de un negocio que lo solicite. No equivale a una inspección presencial, auditoría exhaustiva, certificación, diagnóstico jurídico ni garantía de resultados. La aceptación de solicitudes y la elaboración de muestras visuales adicionales pueden depender de elegibilidad y disponibilidad. Cuando se comunique que la revisión inicial es gratuita, no se cobrará por esa revisión; cualquier servicio adicional requerirá aceptación expresa de sus condiciones.</p>

      <h2>3. Contratación y jerarquía documental</h2>
      <p>El contrato u orden de servicio que ambas partes acepten determinará, según corresponda: entregables y criterios de aceptación; fechas condicionadas a la entrega de materiales y accesos; precio total, moneda, impuestos y pagos; revisiones y solicitudes de cambio; servicios de terceros; soporte y mantenimiento; propiedad y licencias; datos personales; cancelaciones; garantías y resolución de controversias.</p>
      <p>En caso de diferencias, prevalecerá el instrumento contractual individual aceptado respecto del servicio específico, sin desplazar las disposiciones legales imperativas ni los derechos irrenunciables del cliente. La información publicada aquí no altera unilateralmente un contrato previo.</p>

      <h2>4. Información y autorizaciones aportadas por el usuario</h2>
      <p>Quien solicita trabajo sobre una marca, dominio, Perfil de Empresa de Google, sitio, cuenta o material declara contar con autorización suficiente para pedir una evaluación y, posteriormente, encomendar las intervenciones que apruebe. Antes de ejecutar cambios, LSS podrá requerir prueba razonable de titularidad, permisos delegados o consentimiento del titular. La simple entrega de credenciales de otra persona no constituye autorización válida.</p>
      <p>Los clientes deben proporcionar información verdadera, actualizada y lícita, así como materiales sobre los que posean derechos de uso. Las reseñas, credenciales, fotografías y afirmaciones comerciales deben contar con respaldo. LSS puede suspender una intervención concreta mientras se aclaran permisos, instrucciones contradictorias o contenidos potencialmente ilícitos, comunicándolo por el canal contractual correspondiente.</p>

      <h2>5. Propiedad intelectual del sitio</h2>
      <p>Salvo indicación expresa, los textos, ilustraciones originales, estructura visual, signos distintivos y código propio de este sitio pertenecen a sus respectivos titulares y están protegidos por las normas aplicables de propiedad intelectual. Puedes consultar y compartir enlaces al sitio para fines lícitos, y realizar los usos permitidos por la ley. No se autoriza presentar contenidos de LSS como propios, suplantar su identidad ni comercializar copias sustanciales no autorizadas.</p>
      <p>Los componentes, fuentes, marcas y herramientas de terceros conservan los derechos y condiciones de sus titulares. En un proyecto contratado, la titularidad del dominio, las cuentas, los archivos, los diseños, los derechos de uso, las licencias y la transferencia de materiales se definirán en el contrato y conforme a la legislación aplicable; no se promete una cesión ilimitada de derechos de terceros.</p>

      <h2>6. Uso legítimo y seguridad</h2>
      <p>No está permitido intentar acceso no autorizado, eludir controles de seguridad, introducir software malicioso, interferir deliberadamente con el sitio, suplantar identidades o utilizar los medios de contacto para acoso, fraude o contenidos ilícitos. Esta disposición no impide el ejercicio legítimo de derechos, la investigación permitida por ley ni el uso ordinario de buscadores.</p>
      <p>Podremos limitar accesos abusivos y preservar evidencias de incidentes de seguridad de forma proporcionada y conforme a las leyes aplicables.</p>

      <h2>7. Plataformas de terceros y disponibilidad</h2>
      <p>El funcionamiento de enlaces y servicios relacionados con WhatsApp, Meta, Google, registradores, proveedores de alojamiento o correo depende también de sus sistemas y condiciones. LSS no controla sus decisiones de elegibilidad, disponibilidad, posiciones en buscadores, algoritmos ni políticas. El servicio contratado describirá cuáles gestiones específicas asume LSS ante esas plataformas.</p>
      <p>Procuramos mantener este sitio disponible y actualizado, pero pueden existir interrupciones por mantenimiento, fallas técnicas o eventos ajenos al control razonable de LSS. Ninguna cláusula pretende eximir incumplimientos, negligencia o responsabilidades que no puedan excluirse legalmente.</p>

      <h2>8. Resultados, información y responsabilidad</h2>
      <p>La mejora de la presentación digital puede facilitar que las personas comprendan y contacten un negocio, pero las decisiones de terceros dependen también de la demanda, la oferta, los precios, la atención y el mercado. Este sitio no promete números de prospectos, citas, ventas, posiciones en Google ni retornos de inversión determinados. Los resultados verificables y las obligaciones concretas se definen en cada contrato.</p>
      <p>En la máxima medida permitida por las leyes aplicables, LSS no asume responsabilidad por daños atribuibles exclusivamente a información falsa proporcionada por terceros, uso indebido del sitio o sistemas externos fuera del alcance contratado. Cualquier limitación, asignación de riesgos o compensación económica sobre un servicio pagado deberá establecerse con claridad en el contrato correspondiente y respetar los derechos irrenunciables del consumidor y demás normas imperativas. Esta página no impone una renuncia general a reclamar.</p>

      <h2>9. Precios, pagos, cancelaciones y garantías</h2>
      <p>Este sitio no procesa pagos ni confirma contrataciones mediante sus botones. Antes de formalizar un proyecto se informarán alcance, precio, impuestos cuando procedan, calendario, condiciones de cancelación y renovaciones; no se interpretará una conversación preliminar como aceptación de cargos periódicos. Ninguna mensualidad será obligatoria salvo que exista acuerdo expreso que la contemple.</p>
      <p>Los derechos, garantías y remedios reconocidos por la Ley Federal de Protección al Consumidor y otras normas aplicables prevalecen sobre cualquier estipulación incompatible. La garantía de un proyecto no se confunde con la revisión gratuita inicial ni puede limitarse mediante frases generales de este sitio.</p>

      <h2>10. Confidencialidad y datos personales</h2>
      <p>La información personal se trata conforme al <Link href="/privacidad">Aviso de privacidad</Link>. Si un proyecto implica información confidencial, accesos de administración o datos de clientes finales, las obligaciones de confidencialidad, custodia, permisos y devolución se definirán adicionalmente en el acuerdo del proyecto. Una consulta abierta no equivale a la celebración automática de un contrato de confidencialidad.</p>

      <h2>11. Contacto, aclaraciones y reclamaciones</h2>
      <p>Para dudas sobre el sitio o solicitudes comerciales escribe a <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a> o utiliza WhatsApp al {CONTACT.whatsapp}. Las reclamaciones sobre proyectos contratados se atenderán por los medios y conforme a los plazos establecidos en el acuerdo respectivo y las disposiciones aplicables.</p>

      <h2>12. Ley aplicable y actividad internacional</h2>
      <p>Este sitio se opera desde México. Para cuestiones relacionadas con su uso se consideran las leyes mexicanas aplicables, sin excluir las normas obligatorias de protección de consumidores, propiedad intelectual o datos personales que resulten pertinentes en otros países por la operación realizada. Las controversias de un servicio contratado se resolverán mediante los mecanismos competentes que legalmente correspondan y conforme al contrato respectivo, sin imponer aquí un fuero exclusivo que prive a una persona consumidora de sus derechos.</p>

      <h2>13. Cambios y vigencia</h2>
      <p>La versión publicada y su fecha identifican los términos informativos vigentes para el sitio. Podremos ajustarlos para reflejar cambios de operación o de normas aplicables. Ninguna actualización modifica retroactivamente contratos ya aceptados ni invalida derechos adquiridos. Si alguna disposición resultara inaplicable, las restantes subsistirán en la medida permitida por la ley.</p>
    </LegalPage>
  );
}
