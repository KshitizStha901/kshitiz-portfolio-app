"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroStats, profile } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  // The hero is above the fold, so it animates on mount rather than on scroll.
  const container = {
    hidden: {},
    shown: { transition: { staggerChildren: reduced ? 0 : 0.09, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    shown: { opacity: 1, y: 0, transition: { duration: reduced ? 0.2 : 0.5, ease: EASE } },
  };

  return (
    <section className="hero" id="hero">
      <motion.div className="wrap" variants={container} initial="hidden" animate="shown">
        <motion.p className="hero__eyebrow" variants={item}>
          {profile.location} &middot; {profile.availability}
        </motion.p>

        <motion.h1 className="hero__name" variants={item}>
          {profile.name}
        </motion.h1>

        <motion.p className="hero__role" variants={item}>
          {profile.role}
        </motion.p>

        <motion.p className="hero__proof" variants={item}>
          {profile.pitch}
        </motion.p>

        <motion.ul className="hero__stats" variants={item}>
          {heroStats.map((s) => (
            <li className="hero__stat" key={s.value}>
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </li>
          ))}
        </motion.ul>

        {/* Primary sends people to the work, which is what a recruiter or
            client actually wants. Resume drops to a tertiary text link. */}
        <motion.div className="hero__actions" variants={item}>
          <motion.a
            className="btn btn--solid"
            href="#projects"
            whileHover={reduced ? undefined : { y: -2 }}
            whileTap={reduced ? undefined : { y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
          >
            View My Work
          </motion.a>
          <motion.a
            className="btn btn--ghost"
            href="#contact"
            whileHover={reduced ? undefined : { y: -2 }}
            whileTap={reduced ? undefined : { y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>

        <motion.p className="hero__tertiary" variants={item}>
          <a href={profile.resume} download>
            Download Resume (PDF)
          </a>
        </motion.p>

        <motion.ul className="hero__links" variants={item}>
          <li>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <a href={profile.phoneHref}>{profile.phone}</a>
          </li>
          {/* TODO: replace both placeholder URLs in lib/content.ts */}
          <li>
            <a href={profile.github} rel="me noopener" target="_blank">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.linkedin} rel="me noopener" target="_blank">
              LinkedIn
            </a>
          </li>
        </motion.ul>
      </motion.div>
    </section>
  );
}
