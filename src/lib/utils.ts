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

export function formatDuration(duration: string): string {
  // Asume formato "3:45" o convierte segundos a minutos:segundos
  return duration;
}
