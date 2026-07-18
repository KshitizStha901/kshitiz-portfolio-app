/**
 * Site-wide configuration. Anything that is an identity, a URL or a handle
 * lives here so it is changed in exactly one place.
 */

export const site = {
  /** Used for canonical URLs, Open Graph and JSON-LD. Must match public/CNAME. */
  url: "https://kshitizshrestha2058.com.np",

  /**
   * ===================================================================
   * REPLACE THESE TWO. They are still placeholders and they render as
   * visible link text in the Contact section, so a live deploy would
   * literally show "github.com/USERNAME" to a recruiter.
   * Change only the URLs. The visible labels are derived from them.
   * ===================================================================
   */
  social: {
    github: "https://github.com/USERNAME",
    linkedin: "https://linkedin.com/in/USERNAME",
  },
} as const;

/** "https://github.com/foo" becomes "github.com/foo" for display. */
export function urlLabel(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** True while a social URL is still the shipped placeholder. */
export function isPlaceholder(url: string): boolean {
  return url.includes("USERNAME");
}
