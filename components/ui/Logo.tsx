import Image from 'next/image';

type LogoProps = { muted?: boolean };

export default function Logo({ muted = false }: LogoProps) {
  return (
    <a href="#hero" aria-label="LSS — Local Systems Studio" style={{ display: 'inline-flex', alignItems: 'center', opacity: muted ? 0.45 : 1 }}>
      <Image
        src="/logo-horizontal.svg"
        alt="LSS — Local Systems Studio"
        width={156}
        height={48}
        priority
        style={{ height: 44, width: 'auto' }}
      />
    </a>
  );
}
