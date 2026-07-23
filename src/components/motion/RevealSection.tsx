"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  className?: string;
  /** Retraso en segundos para escalonar bloques consecutivos */
  delay?: number;
  /** Visible al cargar, sin esperar al scroll (primer bloque above-the-fold) */
  eager?: boolean;
};

/** Bloque que entra con fade + ligero desplazamiento al entrar en el viewport (una sola vez). */
export function RevealSection({
  children,
  className,
  delay = 0,
  eager = false,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    /** Cualquier píxel visible basta; evita bloqueos en secciones muy altas (p. ej. grid móvil) */
    amount: 0,
    margin: "0px 0px -32px 0px",
  });

  if (reduce || eager) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.52, delay: inView ? delay : 0, ease }}
    >
      {children}
    </motion.div>
  );
}
