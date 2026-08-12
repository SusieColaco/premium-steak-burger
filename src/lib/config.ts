export const siteConfig = {
  name: "Premium Steak Burger",
  tagline: "O sabor que reúne bons momentos!",
  subtext: "Faça seu pedido, reserve sua mesa ou participe do grupo de ofertas exclusivas.",

  phoneDisplay: "(42) 99976-9258",
  whatsappNumber: "5542999769258",

  whatsappGroupUrl:
    "https://api.whatsapp.com/send?phone=5542999769258&text=Ol%C3%A1%2C%20gostaria%20de%20entrar%20no%20grupo%20das%20promo%C3%A7%C3%B5es!%20",
  instagramUrl: "https://www.instagram.com/premium_steakburger",

  address: {
    line: "Av. Pref. Moacir Júlio Silvestri, 2451",
    city: "Guarapuava - PR",
    full: "Av. Pref. Moacir Júlio Silvestri, 2451, Guarapuava - PR",
  },

  hours: [{ days: "Segunda a Sábado", time: "18h às 23h" }],

  spotifyPlaylistEmbedUrl:
    "https://open.spotify.com/embed/playlist/7kypTrSiSadjXnqAbawyKX?utm_source=generator&theme=0",

  orderMessage: "Olá! Gostaria de fazer um pedido na Premium.",
  reservationMessage: "Olá! Gostaria de fazer uma reserva na Premium.",
  generalMessage: "Olá! Vim pelo site da Premium.",
  promoMessage: "Olá, quero aproveitar a promo do Yakisoba!",
};

export const currentPromo = {
  name: "Yakisoba",
  originalPrice: 89,
  promoPrice: 79,
  description: "Porção para 2 pessoas",
  validUntil: "11/08/26 • 22:59",
  image: "/images/yakisoba-promo.jpg",
  expiresAt: new Date("2026-08-11T22:59:00").getTime(),
};

export function isPromoActive(): boolean {
  return Date.now() < currentPromo.expiresAt;
}

export function waLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  siteConfig.address.full
)}&output=embed`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  siteConfig.address.full
)}`;
