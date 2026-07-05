import { HomeBombIcon } from "@/components/HomeBombIcon";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  className?: string;
  compact?: boolean;
};

export default function EventPendingNotice({
  label,
  className,
  compact = false,
}: Props) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/35 backdrop-blur-sm",
        compact ? "px-2.5 py-1.5" : "px-3 py-2",
        className,
      )}
    >
      <HomeBombIcon
        className={cn(
          "shrink-0 text-white/90",
          compact ? "w-4 h-4" : "w-5 h-5",
        )}
      />
      <span
        className={cn(
          "font-semibold text-white/90",
          compact ? "text-xs" : "text-sm",
        )}
      >
        {label}
      </span>
    </div>
  );
}
