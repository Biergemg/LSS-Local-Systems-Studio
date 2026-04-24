'use client';
import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';
import { CONTACT, NAV_LINKS } from '@/data/content';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 20); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <nav aria-label="Navegación principal" style={{ position:'fixed', top:0,left:0,right:0,height:'var(--nav-h)',zIndex:100,backgroundColor:scrolled?'rgba(11,11,11,.97)':'var(--surface-base)',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',transition:'background-color .2s ease' }}>
    <div className="container" style={{ width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between' }}><Logo />
      <div className="nav-desktop" style={{ display:'flex',alignItems:'center',gap:32 }}>{NAV_LINKS.map(link => <a key={link.href} href={link.href} className="t-label" style={{ fontWeight:500,color:'var(--fg2)' }}>{link.label}</a>)}<a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Diagnóstico</a></div>
      <button onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen?'Cerrar menú':'Abrir menú'} className="nav-mobile-btn" style={{ display:'none',flexDirection:'column',gap:5,padding:8 }}><span style={{display:'block',width:22,height:1,background:'var(--fg)',transition:'transform .2s',transform:menuOpen?'rotate(45deg) translate(4px, 4px)':'none'}}/><span style={{display:'block',width:22,height:1,background:'var(--fg)',opacity:menuOpen?0:1,transition:'opacity .2s'}}/><span style={{display:'block',width:22,height:1,background:'var(--fg)',transition:'transform .2s',transform:menuOpen?'rotate(-45deg) translate(4px, -4px)':'none'}}/></button>
    </div>{menuOpen && <div style={{ position:'absolute',top:'var(--nav-h)',left:0,right:0,background:'var(--surface-raised)',borderBottom:'1px solid var(--border)',padding:24,display:'flex',flexDirection:'column',gap:20 }}>{NAV_LINKS.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="t-label" style={{ fontSize:'var(--text-base)',fontWeight:500,color:'var(--fg2)' }}>{link.label}</a>)}<a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="btn btn-primary">Diagnóstico</a></div>}
  </nav>;
}
