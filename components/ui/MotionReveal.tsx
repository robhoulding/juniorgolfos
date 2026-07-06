"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  defaultTransition,
  fadeUp,
  fadeUpReduced,
  reducedMotionTransition,
  viewportOnce,
} from "@/lib/motion";

type MotionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: "div" | "section" | "article" | "li";
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = "div",
}: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];
  const activeVariants =
    prefersReducedMotion && variants === fadeUp ? fadeUpReduced : variants;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={activeVariants}
      transition={
        prefersReducedMotion
          ? reducedMotionTransition
          : { ...defaultTransition, delay }
      }
    >
      {children}
    </Component>
  );
}

type MotionStaggerProps = {
  children: React.ReactNode;
  className?: string;
};

export function MotionStagger({ children, className }: MotionStaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={
        prefersReducedMotion
          ? { hidden: {}, visible: {} }
          : {
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}
