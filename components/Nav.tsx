"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks, profile } from "@/lib/content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  // Tells the reveal-fallback timer in app/layout.tsx that React made it,
  // so it does not need to force the hidden elements visible.
  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "1");
  }, []);

  // Escape closes the drawer, matching the behaviour of the button itself.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a className="nav__brand" href="#hero" onClick={() => setOpen(false)}>
          {profile.name}
        </a>

        <button
          className="nav__toggle"
          id="navToggle"
          aria-expanded={open}
          aria-controls="navMenu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__bars" aria-hidden="true" />
        </button>

        {/* Desktop: always-on horizontal menu. The drawer below is mobile only. */}
        <nav className="nav__menu nav__menu--desktop" aria-label="Main">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="nav__cta" href="#contact">
            Contact
          </a>
        </nav>

        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              className="nav__menu--mobile"
              id="navMenu"
              aria-label="Main"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Padding and border live on the inner element so a collapsed
                  height of 0 renders nothing at all, no residual cream bar. */}
              <div className="nav__menu-inner">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                ))}
                <a className="nav__cta" href="#contact" onClick={() => setOpen(false)}>
                  Contact
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
