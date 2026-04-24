import { CONTACT } from '@/data/content';

export default function WhatsAppFloat() {
  return (
    <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Agendar diagnóstico por WhatsApp" style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 90, width: 56, height: 56, display: 'grid', placeItems: 'center', background: 'var(--accent)', color: '#000', border: '1px solid var(--accent)', boxShadow: '0 0 0 1px rgba(0,0,0,.35)' }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.6a8 8 0 0 1-11.9 7l-3.7 1 1-3.6A8 8 0 1 1 20 11.6Z" stroke="currentColor" strokeWidth="1.8"/><path d="M8.8 8.4c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.4.5c-.1.2-.2.3 0 .5.3.6.8 1.1 1.3 1.5.6.4 1.1.7 1.3.8.2.1.4 0 .5-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.3.4.5 0 .5-.3 1.4-.8 1.7-.5.4-1.4.5-2.4.2-2-.6-4.1-2.3-5.2-4.1-.7-1.2-1-2.2-.8-2.8.1-.3.3-.6.4-.8Z" fill="currentColor"/></svg>
    </a>
  );
}
