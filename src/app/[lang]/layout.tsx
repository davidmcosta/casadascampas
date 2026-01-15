import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../../contexts/CartContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CartSidebar from "../../components/CartSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://gravestones.netlify.app/"),
  title: {
    default: "Casa das Campas | Gravestones, Vases & Memorials",
    template: "%s | Casa das Campas",
  },
  description:
    "Casa das Campas provides elegant gravestones, vases, sculptures, and funeral memorials with dignity and care. Explore our collection and get a quote today.",
  keywords: [
    "Gravestones",
    "Funeral Products",
    "Vases",
    "Sculptures",
    "Memorials",
    "Casa das Campas",
    "Headstones",
    "Custom Tombstones",
    "Book-shaped Gravestones",
    "Heart-shaped Memorials",
    "Campas",
    "Lapides",
    "Fotoceramica",
    "Jarras",
    "Azulejos"
  ],
  authors: [{ name: "Casa das Campas Team" }],
  creator: "Casa das Campas",
  icons: {
    icon: "/images/logo/logoweb.webp",
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/images/appleTouch/apple-touch-icon-iphone-60x60.png",
        sizes: "60x60",
      },
      {
        url: "/images/appleTouch/apple-touch-icon-ipad-76x76.png",
        sizes: "76x76",
      },
      {
        url: "/images/appleTouch/apple-touch-icon-iphone-retina-120x120.png",
        sizes: "120x120",
      },
      {
        url: "/images/appleTouch/apple-touch-icon-ipad-retina-152x152.png",
        sizes: "152x152",
      },
    ],
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "pt" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: "en" | "pt" };
}) {
  const { lang } = await params; // ✅ OBRIGATÓRIO no Next 15

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`}>
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
