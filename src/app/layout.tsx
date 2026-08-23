import type { Metadata, Viewport } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import { site, contacts, company, faq } from "@/config/site";
import { LeadProvider } from "@/components/lead/LeadContext";
import { LeadModal } from "@/components/lead/LeadModal";
import { CookieBanner } from "@/components/CookieBanner";
import { ChannelPromo } from "@/components/ChannelPromo";
import "./globals.css";

const display = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", weight: ["600", "700", "800"] });
const sans = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name }],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#07070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const tgHref = contacts.telegram.startsWith("http")
    ? contacts.telegram
    : `https://t.me/${contacts.telegram.replace("@", "")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: company.legalName,
        url: site.url,
        description: site.description,
        email: company.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address,
          addressCountry: "RU",
        },
        sameAs: [tgHref, contacts.telegramChannel, `https://wa.me/${contacts.whatsappRaw}`],
        areaServed: "RU",
        knowsAbout: [
          "Программирование для детей",
          "Создание игр",
          "Разработка сайтов",
          "Python",
          "Web-разработка",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "ru-RU",
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <html lang="ru" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LeadProvider>
          {children}
          <LeadModal />
        </LeadProvider>
        <CookieBanner />
        <ChannelPromo />
      </body>
    </html>
  );
}
