// ID de medición de GA4 (formato G-XXXXXXXX). Sin ID válido no se carga nada ni se muestra el control de privacidad.
const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const GA_ID: string | undefined = raw && /^G-[A-Z0-9]{6,12}$/.test(raw) ? raw : undefined;
const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
export const META_PIXEL_ID: string | undefined = pixel && /^\d{8,20}$/.test(pixel) ? pixel : undefined;
