'use client';

import Script from 'next/script';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

type Choice = 'yes' | 'no' | null | 'pending';
// Nueva autorización específica para la medición: un "sí" anterior a Meta no autoriza GA4.
// Requerir una nueva decisión impide extender retrospectivamente un consentimiento.
const COOKIE_DOMAIN = '.lsslocalsystemsstudio.com';

type GaWindow = Window & { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };

function readConsent(storageKey: string): Choice {
  try {
    const value = localStorage.getItem(storageKey);
    return value === 'yes' || value === 'no' ? value : null;
  } catch { return null; }
}
function readServerConsent(): Choice { return 'pending'; }
function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener('storage', onChange);
  window.addEventListener('lss:consent-changed', onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener('lss:consent-changed', onChange);
  };
}

// Medición de contacto: solo clics y envíos. Nunca el contenido de un mensaje ni el número del visitante.
function contactEvent(target: EventTarget | null): { name: string; params: Record<string, string> } | null {
  const el = target instanceof Element ? target.closest('a, form') : null;
  if (!el) return null;
  const place = el.closest('nav') ? 'menu' : el.closest('footer') ? 'pie' : el.closest('.wa-float') ? 'barra_movil' : (el.closest('section')?.id || 'otro');
  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute('href') ?? '';
    if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return { name: 'whatsapp_click', params: { link_location: place } };
    if (href.startsWith('tel:')) return { name: 'phone_click', params: { link_location: place } };
    if (href.startsWith('mailto:')) return { name: 'email_click', params: { link_location: place } };
    return null;
  }
  return { name: 'form_submit', params: { link_location: place, form_id: el.id || 'sin_id' } };
}

function clearCookies(names: (name: string) => boolean) {
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0].trim();
    if (!names(name)) continue;
    document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
    document.cookie = name + '=; Max-Age=0; path=/; domain=' + COOKIE_DOMAIN + '; SameSite=Lax';
  }
}

export default function TrackingConsent({ pixelId, gaId }: { pixelId?: string; gaId?: string }) {
  // A changed provider set requires a new decision; old GA permission cannot authorize Meta.
  const storageKey = `lss-tracking-consent-v3:${gaId || 'no-ga'}:${pixelId || 'no-meta'}`;
  const choice = useSyncExternalStore(subscribeConsent, () => readConsent(storageKey), readServerConsent);
  const [open, setOpen] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const active = Boolean(pixelId || gaId);

  useEffect(() => {
    const banner = bannerRef.current;
    const root = document.documentElement;
    if (!banner) { root.style.setProperty('--consent-h', '0px'); return; }
    const revealFocus = () => {
      const target = document.activeElement;
      if (!(target instanceof HTMLElement) || target === document.body || banner.contains(target)) return;
      const rect = target.getBoundingClientRect();
      const edge = banner.getBoundingClientRect().top;
      if (rect.top < 0 || rect.bottom > edge) {
        target.scrollIntoView({ block: 'center', behavior: 'instant' });
        const next = target.getBoundingClientRect();
        if (next.bottom > edge) window.scrollBy({ top: next.bottom - edge + 12, behavior: 'instant' });
      }
    };
    const measure = () => {
      root.style.setProperty('--consent-h', `${banner.getBoundingClientRect().height}px`);
      revealFocus();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(banner);
    measure();
    document.addEventListener('focusin', revealFocus);
    return () => {
      observer.disconnect();
      document.removeEventListener('focusin', revealFocus);
      root.style.setProperty('--consent-h', '0px');
    };
  }, [choice, open, active]);

  useEffect(() => {
    if (!active) return;
    const handleOpen = () => setOpen(true);
    window.addEventListener('lss:privacy-preferences', handleOpen);
    return () => window.removeEventListener('lss:privacy-preferences', handleOpen);
  }, [active]);

  useEffect(() => {
    if (!gaId || choice !== 'yes') return;
    const send = (e: Event) => {
      const ev = contactEvent(e.target);
      if (!ev) return;
      const ga = (window as GaWindow).gtag;
      ga?.('event', ev.name, ev.params);
      // This is an INTENT SIGNAL from opening a contact link, never a
      // confirmed inquiry, qualified prospect, sale or submitted message.
      const channels: Record<string, string> = {
        whatsapp_click: 'whatsapp',
        phone_click: 'phone',
        email_click: 'email',
      };
      const channel = channels[ev.name];
      if (channel) ga?.('event', 'contact_intent', {
        contact_channel: channel,
        link_location: ev.params.link_location,
      });
    };
    document.addEventListener('click', send, true);
    document.addEventListener('submit', send, true);
    return () => {
      document.removeEventListener('click', send, true);
      document.removeEventListener('submit', send, true);
    };
  }, [gaId, choice]);

  if (!active || choice === 'pending') return null;

  function decide(next: 'yes' | 'no') {
    const wasAllowed = choice === 'yes';
    try { localStorage.setItem(storageKey, next); } catch { /* Deny tracking if persistence is unavailable. */ }
    window.dispatchEvent(new Event('lss:consent-changed'));
    setOpen(false);
    if (wasAllowed && next === 'no') {
      if (gaId) {
        (window as unknown as Record<string, boolean>)['ga-disable-' + gaId] = true;
        clearCookies((name) => name === '_ga' || name.startsWith('_ga_'));
      }
      clearCookies((name) => name === '_fbp' || name === '_fbc');
      if (pixelId) {
        const fbq = (window as Window & { fbq?: (operation: string, argument?: string) => void }).fbq;
        fbq?.('consent', 'revoke');
      }
      window.location.reload();
    }
  }

  // Carga condicionada: nada de Google se solicita hasta que la persona elige «Permitir».
  // Consentimiento de publicidad siempre denegado; sin señales de Google ni personalización de anuncios.
  const gaScript = gaId ? [
    'window.dataLayer=window.dataLayer||[];',
    'window.gtag=function(){window.dataLayer.push(arguments)};',
    "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});",
    "gtag('js',new Date());",
    "gtag('config'," + JSON.stringify(gaId) + ",{allow_google_signals:false,allow_ad_personalization_signals:false});"
  ].join('\n') : '';

  const pixelScript = pixelId ? [
    "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?",
    "n.callMethod.apply(n,arguments):n.queue.push(arguments)};",
    "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';",
    "n.queue=[];t=b.createElement(e);t.async=!0;",
    "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)",
    "}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');",
    "fbq('consent','grant');",
    "fbq('init'," + JSON.stringify(pixelId) + ");",
    "fbq('track','PageView');"
  ].join('\n') : '';

  const purposes = [gaId && 'Google Analytics: visitas y clics', pixelId && 'Meta: medición publicitaria'].filter(Boolean).join('; ');
  const noun = pixelId && gaId ? '' : gaId ? ' medición' : ' publicidad';

  return (
    <>
      {choice === 'yes' && pixelId && <Script id="lss-meta-pixel-consented" strategy="afterInteractive">{pixelScript}</Script>}
      {choice === 'yes' && gaId && (
        <>
          <Script id="lss-ga4-init" strategy="afterInteractive">{gaScript}</Script>
          <Script id="lss-ga4-lib" src={'https://www.googletagmanager.com/gtag/js?id=' + gaId} strategy="afterInteractive" />
        </>
      )}
      {(choice === null || open) && (
        <div ref={bannerRef} className="privacy-consent" role="dialog" aria-label="Preferencias de privacidad" aria-modal="false">
          <div>
            <p><strong>Medición opcional. </strong>{purposes}. Solo si aceptas. <a href="/privacidad#cookies">Ver aviso</a>.</p>
          </div>
          <div className="privacy-consent-actions">
            <button type="button" className="btn btn-ghost" onClick={() => decide('no')}>Rechazar{noun}</button>
            <button type="button" className="btn btn-ghost" onClick={() => decide('yes')}>Permitir{noun}</button>
            {open && choice !== null && <button type="button" className="link-line" onClick={() => setOpen(false)}>Cerrar</button>}
          </div>
        </div>
      )}
    </>
  );
}
