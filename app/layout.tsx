import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time by next/font, so there is no external
// stylesheet request and no layout shift while the font loads.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Kshitiz Shrestha | Full-Stack Developer, Cloud and Systems",
  description:
    "Kshitiz Shrestha, full-stack developer in Kathmandu, Nepal. Next.js, React, Node, Express, MongoDB, AWS. BSc CSIT, AWS Solutions Architect Associate.",
  authors: [{ name: "Kshitiz Shrestha" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: "Kshitiz Shrestha | Full-Stack Developer, Cloud and Systems",
    description:
      "Full-stack developer building a live production ecommerce platform on Next.js, React, Express and MongoDB. BSc CSIT graduate, AWS Solutions Architect Associate.",
  },
  twitter: { card: "summary" },
  icons: { icon: "/assets/favicon.svg" },
};

export const viewport = { themeColor: "#efe6dd" };

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kshitiz Shrestha",
  jobTitle: "Full-Stack Developer",
  email: "mailto:kshitizstha1007@gmail.com",
  telephone: "+977-9813614667",
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Balaju, Kathmandu",
    addressCountry: "NP",
  },
  worksFor: { "@type": "Organization", name: "Iconiq" },
  alumniOf: "Kathford International College of Engineering and Management",
  hasCredential: "AWS Certified Solutions Architect, Associate",
  knowsLanguage: ["English", "Nepali", "Hindi"],
};

/**
 * Framer Motion serialises its `initial` state into the static HTML, so every
 * animated element ships as style="opacity:0". That is invisible until React
 * hydrates. For a portfolio the blank-page failure mode is unacceptable, so:
 *   1. <noscript> forces everything visible when JS is switched off.
 *   2. A timer forces everything visible if hydration has not happened in 2.5s
 *      (bundle blocked, flaky network, ancient phone).
 * A client component stamps data-hydrated on <html>, which cancels the timer.
 */
const REVEAL_FALLBACK = `
(function () {
  var FORCE = '[style*="opacity:0"]{opacity:1!important;transform:none!important}';
  setTimeout(function () {
    if (document.documentElement.getAttribute('data-hydrated') === '1') return;
    var s = document.createElement('style');
    s.textContent = FORCE;
    document.head.appendChild(s);
  }, 2500);
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <head>
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_FALLBACK }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
