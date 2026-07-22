import type { Metadata } from "next";
import "./globals.css";

/* eslint-disable @next/next/no-sync-scripts -- Cloudflare Web Analytics requires its existing beacon script. */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ladrillo Radar — Auditorías de crowdfunding inmobiliario",
  description:
    "Auditorías locales de Civislend, Urbanitae y wecity: documentación, inconsistencias, promotor, fechas y puntuación en escala de 0 a 10.",
  icons: {
    icon: `${siteUrl}/favicon.png`,
    shortcut: `${siteUrl}/favicon.png`,
  },
  openGraph: {
    title: "Ladrillo Radar",
    description:
      "Proyectos de Civislend, Urbanitae y wecity auditados con un mismo criterio.",
    type: "website",
    locale: "es_ES",
    siteName: "Ladrillo Radar",
    images: [{ url: `${siteUrl}/og.png?v=2`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ladrillo Radar",
    description:
      "Proyectos de Civislend, Urbanitae y wecity auditados con un mismo criterio.",
    images: [`${siteUrl}/og.png?v=2`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        {/* Cloudflare Web Analytics */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"ba97714010c641e8a21caf29e648a45f"}'
        ></script>
        {/* End Cloudflare Web Analytics */}
      </body>
    </html>
  );
}
