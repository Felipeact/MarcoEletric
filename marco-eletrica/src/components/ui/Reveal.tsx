"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Atraso da animação em segundos. */
  delay?: number;
  /** Direção de entrada. */
  direction?: "up" | "left" | "right" | "none";
};

const offset = 40;

/**
 * Revela o conteúdo com um fade suave quando ele entra na viewport.
 * Centraliza o padrão de animação usado em toda a página.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const hidden =
    direction === "up"
      ? { opacity: 0, y: offset }
      : direction === "left"
        ? { opacity: 0, x: -offset }
        : direction === "right"
          ? { opacity: 0, x: offset }
          : { opacity: 0 };

  const variants: Variants = {
    hidden,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
