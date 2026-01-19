import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../../contexts/CartContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CartSidebar from "../../components/CartSidebar";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://casadascampas.pt"),

  title: {
    default: "Casa das Campas | Campas, Lápides & Arte Funerária",
    template: "%s | Casa das Campas",
  },

  description:
    "Casa das Campas é especialista em campas, lápides, fotocerâmica, jarras e arte funerária em granito. Qualidade, respeito e tradição.",

  keywords: [
    "Casa das Campas",
    "campas",
    "lápides",
    "fotocerâmica",
    "jazigos",
    "jarras funerárias",
    "arte funerária",
    "granito",
    "campas personalizadas",
    "lápides em granito",
  ],

  authors: [{ name: "Casa das Campas" }],
  creator: "Casa das Campas",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "/",
    languages: {
      pt: "/pt",
      en: "/en",
    },
  },

  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://casadascampas.pt",
    siteName: "Casa das Campas",
    title: "Casa das Campas | Campas & Lápides em Granito",
    description:
      "Especialistas em campas, lápides e arte funerária. Qualidade e respeito em cada detalhe.",
    images: [
      {
        url: "/images/logo/logoweb.webp",
        width: 1200,
        height: 630,
        alt: "Casa das Campas",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Casa das Campas",
    description:
      "Campas, lápides, fotocerâmica e arte funerária em granito.",
    images: ["/images/logo/logoweb.webp"],
  },

  icons: {
    icon: "/images/logo/logoweb.webp",
    shortcut: "/favicon.ico",
    apple: [
      { url: "/images/appleTouch/apple-touch-icon-iphone-60x60.png", sizes: "60x60" },
      { url: "/images/appleTouch/apple-touch-icon-ipad-76x76.png", sizes: "76x76" },
      { url: "/images/appleTouch/apple-touch-icon-iphone-retina-120x120.png", sizes: "120x120" },
      { url: "/images/appleTouch/apple-touch-icon-ipad-retina-152x152.png", sizes: "152x152" },
    ],
  },
};

export async function generateStaticParams() {
  return [{ lang: "pt" }, { lang: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: "pt" | "en" };
}) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`}>

        {/* 🔥 Schema SEO Local */}
        <Script
          id="schema-local-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FuneralHome",
              "name": "Casa das Campas",
              "url": "https://casadascampas.pt",
              "logo": "https://casadascampas.pt/images/logo/logoweb.webp",
              "image": "https://casadascampas.pt/images/logo/logoweb.webp",
              "description":
                "Especialistas em campas, lápides, fotocerâmica e arte funerária em granito.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "PT"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Portugal"
              },
              "inLanguage": lang,
              "sameAs": [
                "https://www.facebook.com/",
                "https://www.instagram.com/"
              ]
            }),
          }}
        />

        <CartProvider lang={lang}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <CartSidebar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>

      </body>
    </html>
  );
}
