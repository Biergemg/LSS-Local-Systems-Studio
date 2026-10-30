'use client';

export default function PrivacyPreferencesButton({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <button className="footer-preferences" type="button" onClick={() => window.dispatchEvent(new Event('lss:privacy-preferences'))}>
      Preferencias de privacidad
    </button>
  );
}
