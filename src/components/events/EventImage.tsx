import Image, { type ImageProps } from "next/image";
import { trimImageUrl } from "@/lib/event-gallery";

type Props = Omit<ImageProps, "src"> & {
  src: string | null | undefined;
};

/**
 * Imágenes de eventos sin pasar por el optimizador de Next (_next/image).
 * Evita 500 en dev cuando Node no puede fetchear Cloudinary (certificados SSL).
 */
export default function EventImage({ src, alt, ...props }: Props) {
  const url = trimImageUrl(typeof src === "string" ? src : null);
  if (!url) return null;

  return <Image src={url} alt={alt} unoptimized {...props} />;
}
