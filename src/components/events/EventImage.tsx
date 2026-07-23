import type { ImageProps } from "next/image";
import RemoteImage from "@/components/RemoteImage";
import { trimImageUrl } from "@/lib/event-gallery";

type Props = Omit<ImageProps, "src"> & {
  src: string | null | undefined;
};

export default function EventImage({ src, alt, ...props }: Props) {
  const url = trimImageUrl(typeof src === "string" ? src : null);
  if (!url) return null;

  return <RemoteImage src={url} alt={alt} {...props} />;
}
