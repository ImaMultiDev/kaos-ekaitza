"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  className?: string;
  /** Retraso en segundos para escalonar bloques consecutivos */
  delay?: number;
};

/** Bloque que entra con fade + ligero desplazamiento al entrar en el viewport (una sola vez). */
export function RevealSection({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -72px 0px" }}
      transition={{ duration: 0.52, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
