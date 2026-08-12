import type { Metadata } from "next";
import { Oswald, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Premium Steak Burger | Hambúrgueres, Carnes e Delivery em Guarapuava",
  description:
    "Hambúrgueres artesanais, carnes, porções e sobremesas. Faça seu pedido direto pelo WhatsApp ou reserve sua mesa.",
  openGraph: {
    title: "Premium Steak Burger | Hambúrgueres e Carnes em Guarapuava",
    description:
      "O sabor que reúne bons momentos! Cortes nobres, hambúrgueres artesanais, drinks e chopp. Peça agora no WhatsApp.",
    url: "https://premium-steak-burger.netlify.app",
    siteName: "Premium Steak Burger",
    type: "website",
    images: [
      {
        url: "https://premium-steak-burger.netlify.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Premium Steak Burger - Hambúrgueres Artesanais",
      },
    ],
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Steak Burger",
    description: "O sabor que reúne bons momentos!",
    images: ["https://premium-steak-burger.netlify.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${oswald.variable} ${poppins.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-ink-900 font-body antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
