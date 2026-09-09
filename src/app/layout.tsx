import type { Metadata, Viewport } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import { site, contacts, company, faq, founder, founderSameAs, projects } from "@/config/site";
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
  authors: [{ name: founder.name, url: founder.social.telegram }, { name: site.name }],
  creator: `${founder.name} (${founder.nameEn})`,
  publisher: site.legalName,
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
        // sameAs организации — только каналы школы; личные профили живут в узле Person ниже
        sameAs: [tgHref, contacts.telegramChannel, `https://wa.me/${contacts.whatsappRaw}`],
        founder: { "@id": `${site.url}/#founder` },
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
        "@type": "Person",
        "@id": `${site.url}/#founder`,
        name: founder.name,
        alternateName: founder.alternateNames,
        jobTitle: founder.jobTitle,
        description: founder.description,
        url: site.url,
        sameAs: founderSameAs,
        worksFor: { "@id": `${site.url}/#organization` },
        owns: projects.map((project) => ({
          "@type": project.type,
          name: project.name,
          alternateName: project.nameEn,
          url: project.url,
          description: project.description,
        })),
        knowsAbout: [
          "Программирование для детей",
          "Онлайн-образование",
          "Обучение шахматам",
          "Технологические продукты",
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
