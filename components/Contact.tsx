"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/content";
import SectionHead from "./SectionHead";
import { Reveal, Stagger, StaggerItem } from "./Motion";

export default function Contact() {
  const reduced = useReducedMotion();

  const rows = [
    { label: "Email", href: `mailto:${profile.email}`, text: profile.email },
    { label: "Phone", href: profile.phoneHref, text: profile.phone },
    { label: "GitHub", href: profile.github, text: profile.githubLabel, external: true },
    { label: "LinkedIn", href: profile.linkedin, text: profile.linkedinLabel, external: true },
    { label: "Location", text: profile.location },
    { label: "Languages", text: profile.languages },
  ];

  return (
    <section className="section section--invert" id="contact">
      <div className="wrap">
        <SectionHead index="06" title="Contact" />

        <Reveal>
          <p className="contact__open">
            <span className="contact__open-label">Currently open to</span>
            {profile.openTo}
          </p>
        </Reveal>

        <Stagger as="ul" className="contact" gap={0.06}>
          {rows.map((r) => (
            <StaggerItem as="li" key={r.label}>
              <span className="contact__label">{r.label}</span>
              {r.href ? (
                <a
                  href={r.href}
                  {...(r.external ? { rel: "me noopener", target: "_blank" } : {})}
                >
                  {r.text}
                </a>
              ) : (
                <span>{r.text}</span>
              )}
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <motion.a
            className="btn btn--invert"
            href={profile.resume}
            download
            whileHover={reduced ? undefined : { y: -2 }}
            whileTap={reduced ? undefined : { y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
          >
            Download Resume (PDF)
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
