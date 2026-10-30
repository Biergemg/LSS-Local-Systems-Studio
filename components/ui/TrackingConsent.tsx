'use client';

import Script from 'next/script';
import { useEffect, useState, useSyncExternalStore } from 'react';

type Choice = 'yes' | 'no' | null | 'pending';
const STORAGE_KEY = 'lss-marketing-consent-v1';

function readConsent(): Choice {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
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

export default function TrackingConsent({ pixelId }: { pixelId?: string }) {
  const choice = useSyncExternalStore(subscribeConsent, readConsent, readServerConsent);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!pixelId) return;
    const handleOpen = () => setOpen(true);
    window.addEventListener('lss:privacy-preferences', handleOpen);
    return () => window.removeEventListener('lss:privacy-preferences', handleOpen);
  }, [pixelId]);

  if (!pixelId || choice === 'pending') return null;

  function decide(next: 'yes' | 'no') {
    const wasAllowed = choice === 'yes';
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* Deny tracking if persistence is unavailable. */ }
    window.dispatchEvent(new Event('lss:consent-changed'));
    setOpen(false);
    if (wasAllowed && next === 'no') {
      const fbq = (window as Window & { fbq?: (operation: string, argument?: string) => void }).fbq;
      fbq?.('consent', 'revoke');
      for (const name of ['_fbp', '_fbc']) {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
        document.cookie = name + '=; Max-Age=0; path=/; domain=.lsslocalsystemsstudio.com; SameSite=Lax';
      }
      window.location.reload();
    }
  }

  const pixelScript = [
    "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?",
    "n.callMethod.apply(n,arguments):n.queue.push(arguments)};",
    "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';",
    "n.queue=[];t=b.createElement(e);t.async=!0;",
    "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)",
    "}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');",
    "fbq('consent','grant');",
    "fbq('init'," + JSON.stringify(pixelId) + ");",
    "fbq('track','PageView');"
  ].join('\n');

  return (
    <>
      {choice === 'yes' && <Script id="lss-meta-pixel-consented" strategy="afterInteractive">{pixelScript}</Script>}
      {(choice === null || open) && (
        <aside className="privacy-consent" role="dialog" aria-label="Preferencias de privacidad" aria-modal="false">
          <div>
            <strong>Tu privacidad, tu decisión.</strong>
            <p>Usamos tecnologías técnicas necesarias. Solo con tu permiso activamos la medición publicitaria de Meta. Puedes continuar sin aceptarla. <a href="/privacidad#cookies">Consulta el aviso</a>.</p>
          </div>
          <div className="privacy-consent-actions">
            <button type="button" className="btn btn-ghost" onClick={() => decide('no')}>Rechazar publicidad</button>
            <button type="button" className="btn btn-primary" onClick={() => decide('yes')}>Permitir publicidad</button>
            {open && choice !== null && <button type="button" className="link-line" onClick={() => setOpen(false)}>Cerrar</button>}
          </div>
        </aside>
      )}
    </>
  );
}
