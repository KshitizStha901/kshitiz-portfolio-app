"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Motion primitives shared by every section.
 *
 * Restraint rules applied throughout:
 *  - one axis of movement only (small y travel), never scale-in on text
 *  - viewport once:true, so nothing re-animates on scroll back up
 *  - when the OS asks for reduced motion, every variant collapses to a
 *    plain opacity swap with zero travel
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade and lift a block into view as it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: reduced ? 0.2 : 0.55, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that releases its children one after another. */
export function Stagger({
  children,
  className,
  gap = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul" | "ol";
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </MotionTag>
  );
}

/** Child of <Stagger>. Inherits timing from the parent. */
export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 18 },
    shown: { opacity: 1, y: 0, transition: { duration: reduced ? 0.2 : 0.5, ease: EASE } },
  };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}

/**
 * Card that both reveals with its parent <Stagger> and lifts on hover.
 * It carries the same variants as StaggerItem, otherwise it would fall
 * outside the parent's orchestration and pop in fully formed.
 */
export function HoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 18 },
    shown: { opacity: 1, y: 0, transition: { duration: reduced ? 0.2 : 0.5, ease: EASE } },
  };

  return (
    <motion.li
      className={className}
      variants={variants}
      whileHover={reduced ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      {children}
    </motion.li>
  );
}
