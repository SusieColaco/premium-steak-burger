import type { Metadata } from "next";
import Script from "next/script";
import { Oswald, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { siteConfig } from "@/lib/config";

const SITE_URL = "https://premiumsteakburger.com.br";

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteConfig.name,
  image: `${SITE_URL}/images/hero-steak.jpg`,
  url: SITE_URL,
  telephone: `+${siteConfig.whatsappNumber}`,
  priceRange: "$$",
  servesCuisine: ["Steakhouse", "Hamburgueria", "Brasileira"],
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.line,
    addressLocality: "Guarapuava",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "18:00",
      closes: "23:00",
    },
  ],
  sameAs: [siteConfig.instagramUrl],
};

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
  metadataBase: new URL(SITE_URL),
  title: "Premium Steak Burger | Hambúrgueres, Carnes e Delivery em Guarapuava",
  description:
    "Hambúrgueres artesanais, carnes, porções e sobremesas. Faça seu pedido direto pelo WhatsApp ou reserve sua mesa.",
  openGraph: {
    title: "Premium Steak Burger | Hambúrgueres e Carnes em Guarapuava",
    description:
      "O sabor que reúne bons momentos! Cortes nobres, hambúrgueres artesanais, drinks e chopp. Peça agora no WhatsApp.",
    url: SITE_URL,
    siteName: "Premium Steak Burger",
    type: "website",
    images: [
      {
        url: "/images/hero-steak.jpg",
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
    images: ["/images/hero-steak.jpg"],
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
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-PBZ4VV27B9" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-PBZ4VV27B9');` }} />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '302142324477939');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=302142324477939&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
