import type { EventPageAccess } from "@prisma/client";

export function isEventDetailAccessible(
  pageAccess: EventPageAccess | undefined,
): boolean {
  return (pageAccess ?? "FULL") === "FULL";
}

export function isEventTeaser(pageAccess: EventPageAccess | undefined): boolean {
  return pageAccess === "TEASER";
}
