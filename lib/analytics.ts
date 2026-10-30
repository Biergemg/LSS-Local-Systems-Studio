// El ID público de GA4 no es una credencial. Se versiona para que el push a GitHub active
// la medición en Vercel sin cambios manuales de configuración; una variable de entorno
// explícita permite sustituirlo para pruebas o migraciones controladas.
const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-0DJ220E3ZL';
export const GA_ID: string | undefined = raw && /^G-[A-Z0-9]{6,12}$/.test(raw) ? raw : undefined;
const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
export const META_PIXEL_ID: string | undefined = pixel && /^\d{8,20}$/.test(pixel) ? pixel : undefined;
