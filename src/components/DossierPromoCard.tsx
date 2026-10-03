import RemoteImage from "@/components/RemoteImage";
import { DOSSIER_THUMBNAIL, DOSSIER_URL } from "@/lib/dossier-config";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

type Props = {
  title: string;
  body: string;
  cta: string;
  thumbAlt: string;
  linkAria: string;
  className?: string;
};

export default function DossierPromoCard({
  title,
  body,
  cta,
  thumbAlt,
  linkAria,
  className,
}: Props) {
  return (
    <a
      href={DOSSIER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={linkAria}
      className={cn(
        "group block rounded-2xl border-2 border-zinc-800/90 bg-black/50 overflow-hidden transition-all duration-300 hover:border-red-600/55 hover:shadow-[0_20px_48px_rgba(220,38,38,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500",
        className,
      )}
    >
      <div className="grid md:grid-cols-[minmax(0,42%)_1fr] gap-0 items-stretch">
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[200px] bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-800/80 overflow-hidden">
          <RemoteImage
            src={DOSSIER_THUMBNAIL}
            alt={thumbAlt}
            fill
            className="object-cover object-left transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 420px"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 md:to-black/50 pointer-events-none"
            aria-hidden
          />
        </div>
        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-black text-white mb-3">
            {title}
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6 max-w-xl">{body}</p>
          <span className="inline-flex items-center gap-2 self-start rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-red-500">
            {cta}
            <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
          </span>
        </div>
      </div>
    </a>
  );
}
