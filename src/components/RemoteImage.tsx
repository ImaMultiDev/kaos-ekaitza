import Image, { type ImageProps } from "next/image";

export function isRemoteImageSrc(src: ImageProps["src"]): boolean {
  if (typeof src !== "string") return false;
  return /^https?:\/\//i.test(src.trim());
}

/**
 * Wrapper de next/image: URLs remotas (Cloudinary, etc.) van sin optimizador.
 * Evita 500 en dev cuando Node no puede fetchear HTTPS (certificados SSL).
 */
export default function RemoteImage({
  src,
  unoptimized,
  ...props
}: ImageProps) {
  const useUnoptimized = unoptimized ?? isRemoteImageSrc(src);

  return <Image src={src} unoptimized={useUnoptimized} {...props} />;
}
