/** Origen canónico del sitio (URLs absolutas para crawlers: WhatsApp, Meta, X…). */
export const SITE_ORIGIN = "https://kaosekaitza.com";

const LOGO_ABS = `${SITE_ORIGIN}/logo-512.png`;

const defaultLogoImage = {
  url: LOGO_ABS,
  width: 512,
  height: 512,
  alt: "Kaos Ekaitza",
  type: "image/png",
} as const;

/** Imagen OG/Twitter por defecto (logo). */
export const defaultOgImages = [defaultLogoImage];

export const defaultTwitterImageUrls = [LOGO_ABS];

/**
 * Open Graph: portada o imagen destacada si existe, si no el logo.
 * Varias imágenes por si el crawler prioriza la primera (Cloudinary) y el logo hace de respaldo.
 */
export function ogImages(primaryAbsoluteUrl?: string | null) {
  if (!primaryAbsoluteUrl) {
    return [...defaultOgImages];
  }
  return [{ url: primaryAbsoluteUrl }, ...defaultOgImages];
}

export function twitterImages(primaryAbsoluteUrl?: string | null): string[] {
  if (!primaryAbsoluteUrl) {
    return [...defaultTwitterImageUrls];
  }
  return [primaryAbsoluteUrl, LOGO_ABS];
}
