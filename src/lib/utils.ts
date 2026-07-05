import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LOCALE_MAP: Record<string, string> = {
  es: "es-ES",
  eu: "eu-ES",
};

export function formatDate(date: Date | string, locale = "es"): string {
  const tag = LOCALE_MAP[locale] ?? "es-ES";
  return new Date(date).toLocaleDateString(tag, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatEventDateTime(date: Date | string, locale = "es"): string {
  return formatDate(date, locale);
}

/** Fecha YYYY-MM-DD sin hora (mediodía UTC para evitar saltos de día) */
export function parseEventDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

export function formatEventDayMonth(date: Date | string, locale = "es"): string {
  const tag = LOCALE_MAP[locale] ?? "es-ES";
  return new Date(date).toLocaleDateString(tag, {
    day: "numeric",
    month: "short",
  });
}

export function formatEventDay(date: Date | string): string {
  return String(new Date(date).getDate());
}

export function formatEventMonthShort(date: Date | string, locale = "es"): string {
  const tag = LOCALE_MAP[locale] ?? "es-ES";
  return new Date(date)
    .toLocaleDateString(tag, { month: "short" })
    .replace(/\.$/, "")
    .toUpperCase();
}

export function formatDuration(duration: string): string {
  // Asume formato "3:45" o convierte segundos a minutos:segundos
  return duration;
}
