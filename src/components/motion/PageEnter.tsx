"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Transición breve al montar la página (navegación entre rutas `[locale]`). */
export function PageEnter({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className="flex min-h-0 w-full flex-1 flex-col">{children}</div>;
  }

  return (
    <motion.div
      className="flex min-h-0 w-full flex-1 flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.38, ease }}
    >
      {children}
    </motion.div>
  );
}
