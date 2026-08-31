"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  menu,
  allProducts,
  cortesProductIds,
  isProductPromoActive,
  getEffectivePrice,
} from "@/lib/menu";
import { useCart } from "@/lib/cart-context";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function QuantityStepper({ productId }: { productId: string }) {
  const { quantityOf, increment, decrement } = useCart();
  const qty = quantityOf(productId);

  if (qty === 0) {
    return (
      <button
        onClick={() => increment(productId)}
        className="rounded-full bg-red-500 px-4 py-2 text-xs font-semibold tracking-wide text-cream-050 transition-all duration-200 hover:bg-red-600 active:scale-95"
      >
        Adicionar
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-full border border-ink-900/15 px-1 py-1">
      <button
        onClick={() => decrement(productId)}
        className="flex h-7 w-7 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-900/5 active:scale-90"
        aria-label="Diminuir"
      >
        −
      </button>
      <span className="min-w-[1.2rem] text-center text-sm font-medium text-ink-900">
        {qty}
      </span>
      <button
        onClick={() => increment(productId)}
        className="flex h-7 w-7 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-900/5 active:scale-90"
        aria-label="Aumentar"
      >
        +
      </button>
    </div>
  );
}

const CHIP_COLORS = [
  { active: "bg-red-500 border-red-500 text-cream-050" },
  { active: "bg-gold border-gold text-cream-050" },
  { active: "bg-green border-green text-cream-050" },
  { active: "bg-ink-900 border-ink-900 text-cream-050" },
];

export default function PedidoPage() {
  return (
    <Suspense fallback={null}>
      <PedidoContent />
    </Suspense>
  );
}

function PedidoContent() {
  const { itemCount, subtotal, isHydrated } = useCart();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>(menu[0]?.id ?? null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat && menu.some((c) => c.id === cat)) {
      goToCategory(cat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }, [search]);

  function goToCategory(categoryId: string) {
    setSearch("");
    setOpenCategory(categoryId);
    requestAnimationFrame(() => {
      sectionRefs.current[categoryId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col bg-cream-050 pb-32 md:max-w-2xl">
      <div className="px-6 pb-4 pt-5">
        <div className="flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="Premium Steak Burger"
            width={766}
            height={290}
            className="h-8 w-auto brightness-0"
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wide text-ink-900/60 transition-colors hover:text-red-500"
          >
            ← Voltar
          </Link>
          <span className="w-12" />
        </div>

        <h1 className="mt-3 font-display text-xl font-bold leading-snug text-ink-900">
          Peça do seu jeito!
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-900/60">
          Monte seu pedido no nosso cardápio. Com poucos cliques seu pedido
          chega prontinho no WhatsApp da nossa equipe.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2.5">
          <span className="text-sm">🏷️</span>
          <p className="text-[11px] font-medium leading-snug text-ink-900">
            Use o cupom{" "}
            <span className="font-bold text-gold">PREMIUM10</span> e garanta
            10% de desconto no seu pedido!
          </p>
        </div>

        <div className="mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔎 Procurar hambúrguer, porção, sobremesa…"
            className="w-full rounded-full border border-ink-900/15 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-900/40 focus:border-red-500/60 focus:outline-none"
          />
        </div>
      </div>

      {/* Atalhos de categoria — fixos no topo ao rolar */}
      <div className="sticky top-0 z-20 border-b border-ink-900/10 bg-cream-050/95 px-6 py-3 backdrop-blur">
        <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6">
          {menu.map((category, i) => {
            const isActive = openCategory === category.id && !search;
            const colorClass = CHIP_COLORS[i % CHIP_COLORS.length].active;
            return (
              <button
                key={category.id}
                onClick={() => goToCategory(category.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? colorClass
                    : "border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/40"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6">
        {searchResults ? (
          <div className="grid grid-cols-1 gap-3 pt-5 md:grid-cols-2">
            {searchResults.length === 0 ? (
              <p className="pt-6 text-center text-sm text-ink-900/50 md:col-span-2">
                Nada encontrado para &quot;{search}&quot;.
              </p>
            ) : (
              searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  requireAccompaniment={cortesProductIds.has(product.id)}
                />
              ))
            )}
          </div>
        ) : (
          menu.map((category) => (
            <div
              key={category.id}
              ref={(el) => {
                sectionRefs.current[category.id] = el;
              }}
              className="scroll-mt-[3.5rem] border-b border-ink-900/10 py-4"
            >
              <span className="font-display text-base font-semibold tracking-wide text-ink-900">
                {category.name}
              </span>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {category.note && (
                  <p className="text-xs font-light text-ink-900/50 md:col-span-2">
                    {category.note}
                  </p>
                )}
                {category.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    requireAccompaniment={cortesProductIds.has(product.id)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {isHydrated && itemCount > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md px-4 pb-4 md:max-w-2xl">
          <Link
            href="/pedido/checkout"
            className="flex items-center justify-between rounded-2xl bg-red-500 px-5 py-4 shadow-[0_8px_30px_rgba(228,39,44,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-cream-050">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cream-050 text-xs font-bold text-red-600">
                {itemCount}
              </span>
              Conferir e enviar pelo WhatsApp
            </span>
            <span className="text-sm font-semibold text-cream-050">
              {formatBRL(subtotal)}
            </span>
          </Link>
        </div>
      )}
    </main>
  );
}

const ACCOMPANIMENTS = [
  "Trio de fritas (batata frita, aipim e polenta)",
  "Arroz, maionese de batata e farofa da casa",
  "Mix de legumes salteados",
];

function ProductCard({
  product,
  requireAccompaniment = false,
}: {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    promo?: { price: number; expiresAt: number };
  };
  requireAccompaniment?: boolean;
}) {
  const { quantityOf, increment, noteOf, setNote } = useCart();
  const qty = quantityOf(product.id);
  const note = noteOf(product.id);
  const [pending, setPending] = useState("");
  const needsChoice = requireAccompaniment && qty === 0;
  const onPromo = isProductPromoActive(product);

  return (
    <div className="rounded-[14px] border border-ink-900/10 bg-white p-4 shadow-[0_2px_10px_rgba(20,17,16,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-sm font-semibold text-ink-900">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-1 text-xs font-light leading-relaxed text-ink-900/55">
              {product.description}
            </p>
          )}
          {onPromo ? (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-ink-900/40 line-through">
                {formatBRL(product.price)}
              </span>
              <span className="text-sm font-semibold text-red-500">
                {formatBRL(getEffectivePrice(product))}
              </span>
              <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-red-500">
                Promoção de hoje
              </span>
            </div>
          ) : (
            <p className="mt-2 text-sm font-semibold text-red-500">
              {formatBRL(product.price)}
            </p>
          )}
          {onPromo && (
            <p className="mt-1 text-[10px] text-ink-900/40">
              Cupom de desconto não é válido neste item.
            </p>
          )}
          {requireAccompaniment && qty > 0 && note && (
            <p className="mt-2 text-xs text-ink-900/60">
              Acompanhamento: {note}
            </p>
          )}
        </div>
      </div>

      {needsChoice && (
        <div className="mt-3 flex flex-col gap-1.5 border-t border-ink-900/10 pt-3">
          <p className="text-xs font-semibold text-ink-900">
            Escolha 1 acompanhamento:
          </p>
          {ACCOMPANIMENTS.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-xs text-ink-900/80"
            >
              <input
                type="radio"
                name={`accompaniment-${product.id}`}
                checked={pending === option}
                onChange={() => setPending(option)}
                className="accent-red-500"
              />
              {option}
            </label>
          ))}
        </div>
      )}

      <div className="mt-3 flex justify-end">
        {needsChoice ? (
          <button
            onClick={() => {
              increment(product.id);
              setNote(product.id, pending);
            }}
            disabled={!pending}
            className="rounded-full bg-red-500 px-4 py-2 text-xs font-semibold tracking-wide text-cream-050 transition-all duration-200 hover:bg-red-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Adicionar
          </button>
        ) : (
          <QuantityStepper productId={product.id} />
        )}
      </div>
    </div>
  );
}
