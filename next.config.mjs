/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `next build` emits a fully static site into out/,
  // which is what GitHub Pages publishes. No Node server at runtime.
  output: "export",

  // The export target has no image optimisation server.
  images: { unoptimized: true },

  // Emit out/index/index.html style folders so paths resolve cleanly
  // on a static host without server side rewrites.
  trailingSlash: true,
};

export default nextConfig;
