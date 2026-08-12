import Image from "next/image";
import Link from "next/link";
import {
  siteConfig,
  waLink,
  mapsEmbedUrl,
  mapsDirectionsUrl,
  currentPromo,
  isPromoActive,
} from "@/lib/config";
import {
  FlameIcon,
  BagIcon,
  GobletIcon,
  ClockIcon,
  WhatsAppIcon,
  InstagramIcon,
  MusicNoteIcon,
  SteakIcon,
  ScoopBowlIcon,
  BurgerIcon,
  CupStrawIcon,
} from "@/components/icons";
import { SectionLabel } from "@/components/section-label";
import { InstagramEmbed } from "@/components/instagram-embed";

const HIGHLIGHTS = [
  { label: "Cortes Nobres", icon: SteakIcon },
  { label: "Burgers", icon: BurgerIcon },
  { label: "Drinks", icon: CupStrawIcon },
  { label: "Chopp", icon: GobletIcon },
  { label: "Porções", icon: ScoopBowlIcon },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-ink-900">
      {/* Hero */}
      <section className="relative flex flex-col items-center overflow-hidden px-6 pb-10 pt-14 text-center md:pb-16 md:pt-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-steak.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[62%_28%]"
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-steak.jpg"
            className="absolute inset-0 h-full w-full object-cover object-[62%_28%] motion-reduce:hidden"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-ink-900/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/25 via-ink-900/70 to-ink-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(20,17,16,0.45)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-md flex-col items-center md:max-w-2xl">
          <Image
            src="/images/logo.png"
            alt="Premium Steak Burger"
            width={766}
            height={290}
            priority
            className="mb-5 h-auto w-32 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] md:w-40"
          />

          <div className="flex items-center justify-center gap-3 text-cream-050">
            <span className="h-px w-7 bg-gradient-to-r from-transparent to-cream-050/50 md:w-10" />
            <span className="font-display text-[10px] font-medium uppercase tracking-[0.3em] md:text-xs">
              Guarapuava
            </span>
            <span className="h-px w-7 bg-gradient-to-l from-transparent to-cream-050/50 md:w-10" />
          </div>

          <h1 className="mt-5 font-display text-[26px] font-semibold leading-snug tracking-normal text-cream-050 md:text-4xl md:tracking-wide">
            Há 8 anos elevando
            <br /> a gastronomia de Guarapuava
          </h1>
          <p className="mt-3 w-full text-sm font-light leading-relaxed text-warm-200/70 md:text-base">
            {siteConfig.subtext}
          </p>
        </div>
      </section>

      {/* Botões principais */}
      <section className="relative z-10 mx-auto w-full max-w-md px-6 md:max-w-2xl">
        <div className="flex flex-col gap-3 md:flex-row">
          <Link
            href="/pedido"
            className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-red-500 px-5 py-4 text-sm font-semibold tracking-wide text-cream-050 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-[0_0_28px_rgba(228,39,44,0.5)] active:scale-[0.98]"
          >
            <BagIcon className="h-4 w-4" />
            Quero fazer um pedido
          </Link>

          <a
            href={waLink(siteConfig.reservationMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-cream-050 px-5 py-4 text-sm font-semibold tracking-wide text-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white active:scale-[0.98]"
          >
            <GobletIcon className="h-4 w-4" />
            Quero reservar uma mesa
          </a>

          <a
            href={siteConfig.whatsappGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-cream-050 px-5 py-4 text-sm font-semibold tracking-wide text-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white active:scale-[0.98]"
          >
            <FlameIcon className="h-4 w-4" />
            Quero entrar no Grupo VIP
          </a>
        </div>
      </section>

      {/* O que você vai encontrar */}
      <section className="mx-auto mt-12 w-full max-w-md px-6 md:max-w-2xl">
        <SectionLabel>O que você vai encontrar na Premium</SectionLabel>
        <div className="flex flex-nowrap justify-center gap-1 overflow-x-auto">
          {HIGHLIGHTS.map((item) => (
            <span
              key={item.label}
              className="shrink-0 whitespace-nowrap rounded-full border border-gold/25 bg-gold/10 px-2 py-1 text-[10px] font-semibold text-cream-100"
            >
              {item.label}
            </span>
          ))}
        </div>
      </section>

      {/* Promoção Destaque */}
      {isPromoActive() && (
        <section className="mx-auto mt-12 w-full max-w-md px-6 md:max-w-2xl">
          <a
            href={waLink(siteConfig.promoMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-[14px] border border-red-500/40 bg-gradient-to-br from-red-500/20 to-red-600/10 p-5 transition-all duration-200 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(228,39,44,0.3)] active:scale-[0.98]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-2 inline-block rounded-full bg-red-500/20 px-3 py-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-red-300">
                    Promoção
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-cream-050">
                  {currentPromo.name}
                </h3>
                <p className="mt-2 text-sm font-light text-warm-200/80">
                  {currentPromo.description}
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-xs line-through text-warm-200/50">
                    R$ {(currentPromo.originalPrice).toFixed(2)}
                  </span>
                  <span className="font-display text-2xl font-bold text-red-400">
                    R$ {(currentPromo.promoPrice).toFixed(2)}
                  </span>
                </div>
                <p className="mt-3 text-xs text-warm-200/60">
                  Válido até {currentPromo.validUntil}
                </p>
              </div>
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[10px] bg-red-500/10">
                <span className="text-center text-xs font-semibold text-red-400">
                  Clique para aproveitar!
                </span>
              </div>
            </div>
          </a>
        </section>
      )}

      {/* Música ao vivo + playlist */}
      <section className="mx-auto mt-12 w-full max-w-md px-6 md:max-w-2xl">
        <SectionLabel>Trilha Sonora</SectionLabel>

        <div className="flex items-center gap-3 rounded-[14px] border border-red-500/25 bg-red-500/10 p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-500">
            <MusicNoteIcon className="h-4 w-4" />
          </span>
          <p className="text-sm leading-snug text-cream-100">
            <span className="font-semibold text-red-400">Sexta e sábado</span> tem
            música ao vivo na Premium. Vem curtir com a gente!
          </p>
        </div>

        <p className="mt-4 text-xs font-light leading-relaxed text-warm-200/60">
          Enquanto isso, ouve o som que rola por aqui — os clássicos do rock
          que dão o clima da casa.
        </p>
        <div className="mt-3 overflow-hidden rounded-[14px] border border-warm-400/15">
          <iframe
            src={siteConfig.spotifyPlaylistEmbedUrl}
            width="100%"
            height="152"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            title="Playlist Premium Steak Burger"
          />
        </div>
      </section>

      {/* Localização + Horário */}
      <div className="mx-auto mt-12 w-full max-w-md px-6 md:max-w-2xl lg:grid lg:grid-cols-2 lg:gap-10">
        <section>
          <SectionLabel>Onde estamos</SectionLabel>
          <div className="overflow-hidden rounded-[14px] border border-warm-400/15">
            <iframe
              src={mapsEmbedUrl}
              width="100%"
              height="180"
              loading="lazy"
              className="block grayscale-[20%] contrast-[1.05]"
              title="Localização Premium Steak Burger"
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="mt-4 text-sm font-light leading-relaxed text-warm-200/80">
              {siteConfig.address.line}
              <br />
              {siteConfig.address.city}
            </p>
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-warm-400/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cream-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/70 hover:text-gold active:scale-[0.98]"
            >
              Como chegar
            </a>
          </div>
        </section>

        <section className="mt-12 lg:mt-0">
          <SectionLabel>Horário &amp; Contato</SectionLabel>

          <div className="rounded-[14px] border border-warm-400/10 bg-charcoal-600/30 p-5 text-center shadow-[0_8px_30px_rgba(20,17,16,0.4)]">
            <div className="border-b border-warm-400/10 pb-4">
              <span className="flex items-center justify-center gap-2 text-xs uppercase tracking-wide text-warm-400">
                <ClockIcon className="h-3.5 w-3.5" />
                Atendimento
              </span>
              <p className="mt-2 text-sm text-cream-100">
                {siteConfig.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}, {h.time}
                  </span>
                ))}
              </p>
            </div>
            <div className="pt-4">
              <span className="flex items-center justify-center gap-2 text-xs uppercase tracking-wide text-warm-400">
                <WhatsAppIcon className="h-3.5 w-3.5" />
                Nosso WhatsApp
              </span>
              <a
                href={waLink(siteConfig.generalMessage)}
                className="mt-2 block text-sm font-medium text-cream-100 transition-colors duration-200 hover:text-gold"
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Instagram */}
      <section className="mx-auto mt-12 w-full max-w-md px-6 pb-28 md:max-w-2xl">
        <SectionLabel>Instagram</SectionLabel>
        <InstagramEmbed />

        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-red-500 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-cream-050 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-[0_0_24px_rgba(228,39,44,0.45)] active:scale-[0.98]"
        >
          <InstagramIcon className="h-4 w-4" />
          Siga a Premium no Instagram
        </a>
      </section>

      {/* Botão flutuante WhatsApp */}
      <a
        href={waLink(siteConfig.generalMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-cream-050 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.98]"
        aria-label="Falar no WhatsApp"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
    </main>
  );
}
