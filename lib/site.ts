/**
 * Site-wide configuration. Anything that is an identity, a URL or a handle
 * lives here so it is changed in exactly one place.
 */

export const site = {
  /** Used for canonical URLs, Open Graph and JSON-LD. Must match public/CNAME. */
  url: "https://kshitizshrestha2058.com.np",

  social: {
    github: "https://github.com/KshitizStha901",
    linkedin: "https://www.linkedin.com/in/kshitiz-shrestha-87a384211/",
    /**
     * LinkedIn slugs include a random id suffix, so the auto-derived label
     * (urlLabel) would render the full "linkedin.com/in/kshitiz-shrestha-87a384211"
     * as visible Contact-section text. This is what shows instead.
     */
    linkedinLabel: "linkedin.com/in/kshitiz-shrestha",
  },
} as const;

/** "https://github.com/foo" becomes "github.com/foo" for display. */
export function urlLabel(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
