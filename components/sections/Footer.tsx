import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import PrivacyPreferencesButton from '@/components/ui/PrivacyPreferencesButton';
import { CONTACT, FOOTER, NAV_LINKS, SOCIALS } from '@/data/content';
import { GA_ID, META_PIXEL_ID } from '@/lib/analytics';

const ic = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;
const ICONS: Record<string, React.ReactNode> = {
  Instagram: (<svg {...ic}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" /></svg>),
  Facebook: (<svg {...ic}><path d="M14 8h2.5V4.5H14a4 4 0 0 0-4 4V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V8.8c0-.5.3-.8.8-.8Z" /></svg>),
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="ft-top">
          <Logo />
          <p className="ft-blurb">{FOOTER.blurb}</p>
        </div>
        <div className="ft-grid">
          <nav aria-label="Secciones">
            <p className="ft-h">Explorar</p>
            <ul className="ft-list">
              {NAV_LINKS.map((l) => (<li key={l.href}><Link href={`/${l.href}`}>{l.label}</Link></li>))}
              <li><Link href="/servicios/presencia-digital">Web, Google y contacto</Link></li>
            </ul>
          </nav>
          <div>
            <p className="ft-h">Contacto</p>
            <ul className="ft-list">
              <li><a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"><span className="ft-k">WhatsApp</span>{CONTACT.whatsapp}</a></li>
              <li><a href={`mailto:${CONTACT.email}`}><span className="ft-k">Correo</span>{CONTACT.email}</a></li>
            </ul>
          </div>
          <div>
            <p className="ft-h">Síguenos</p>
            <ul className="ft-social">
              {SOCIALS.map((s) => (
                <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer">{ICONS[s.label]}<span>{s.label}</span></a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ft-legal">
          <p className="ft-trust">{FOOTER.trust}</p>
          <div className="ft-legal-row">
            <p>© {new Date().getFullYear()} Local Systems Studio</p>
            <ul>
              <li><Link href="/privacidad" prefetch={false}>Aviso de privacidad</Link></li>
              <li><Link href="/terminos" prefetch={false}>Términos de uso</Link></li>
              <li><PrivacyPreferencesButton enabled={Boolean(GA_ID || META_PIXEL_ID)} /></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
