/**
 * SERVER ONLY. Build-time checks for optional assets.
 *
 * Lets a component render an image only when a real file is present, so an
 * unset portrait or a missing architecture diagram never ships as a broken
 * image icon.
 */

import fs from "node:fs";
import path from "node:path";

/** Does this public-relative path ("/assets/portrait.jpg") exist on disk? */
export function publicFileExists(publicPath: string): boolean {
  const clean = publicPath.replace(/^\//, "").split("?")[0];
  return fs.existsSync(path.join(process.cwd(), "public", clean));
}

/**
 * Resolve a portrait, trying common extensions so the exact format does not
 * matter. Returns null when nothing is there.
 */
export function resolvePortrait(preferred: string): string | null {
  if (publicFileExists(preferred)) return preferred;

  const base = preferred.replace(/\.[^./]+$/, "");
  for (const ext of [".jpg", ".jpeg", ".png", ".webp", ".avif"]) {
    const candidate = `${base}${ext}`;
    if (publicFileExists(candidate)) return candidate;
  }
  return null;
}
