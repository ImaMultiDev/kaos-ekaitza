"use client";

import { PageEnter } from "@/components/motion/PageEnter";

export default function LocaleTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageEnter>{children}</PageEnter>;
}
