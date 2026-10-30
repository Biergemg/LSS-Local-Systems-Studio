import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import PrivacyPreferencesButton from '@/components/ui/PrivacyPreferencesButton';
import { CONTACT, FOOTER, SOCIALS } from '@/data/content';
import { GA_ID, META_PIXEL_ID } from '@/lib/analytics';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p style={{ marginTop: 16, maxWidth: '44ch' }}>{FOOTER.blurb}</p>
          <p className="small" style={{ marginTop: 10, maxWidth: '44ch' }}>{FOOTER.trust}</p>
        </div>
        <div>
          <p className="eyebrow">Contacto</p>
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp {CONTACT.whatsapp}</a><br />
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
        <div>
          <p className="eyebrow">Redes</p>
          {SOCIALS.map((s) => (
            <span key={s.href} style={{ display: 'block' }}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
            </span>
          ))}
          <span style={{ display: 'block' }}><Link href="/privacidad" prefetch={false}>Aviso de privacidad</Link></span>
          <span style={{ display: 'block' }}><Link href="/terminos" prefetch={false}>Términos de uso</Link></span>
          <PrivacyPreferencesButton enabled={Boolean(GA_ID || META_PIXEL_ID)} />
          <p className="small" style={{ marginTop: 14 }}>© {new Date().getFullYear()} Local Systems Studio</p>
        </div>
      </div>
    </footer>
  );
}
