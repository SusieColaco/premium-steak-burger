"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { menu, allProducts } from "@/lib/menu";
import { useCart } from "@/lib/cart-context";
import { BookIcon, ReceiptIcon, WhatsAppIcon, ScooterIcon } from "@/components/icons";

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

const STEPS = [
  {
    number: "1",
    icon: BookIcon,
    color: "text-red-500 bg-red-500/10",
    title: "Escolha os itens",
    text: "Monte seu pedido no cardápio abaixo",
  },
  {
    number: "2",
    icon: ReceiptIcon,
    color: "text-gold bg-gold/10",
    title: "Confira e informe seus dados",
    text: "Endereço, pagamento e observações",
  },
  {
    number: "3",
    icon: WhatsAppIcon,
    color: "text-[#25D366] bg-[#25D366]/10",
    title: "Finalize no WhatsApp",
    text: "Enviamos tudo prontinho pra Premium",
  },
];

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
      <header className="sticky top-0 z-20 border-b border-ink-900/10 bg-cream-050/95 px-6 pb-4 pt-5 backdrop-blur">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wide text-ink-900/60 transition-colors hover:text-red-500"
          >
            ← Voltar
          </Link>
          <span className="w-12" />
        </div>

        <h1 className="mt-3 font-display text-xl font-bold leading-snug text-ink-900">
          Veja como é fácil fazer seu pedido
        </h1>

        {/* Como funciona */}
        <div className="mt-4 flex gap-3">
          {STEPS.map((step) => (
            <div key={step.number} className="flex flex-1 flex-col items-start gap-2">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${step.color}`}
              >
                <step.icon className="h-[18px] w-[18px]" />
              </span>
              <p className="text-[11px] font-semibold leading-snug text-ink-900">
                {step.title}
              </p>
              <p className="text-[10px] leading-snug text-ink-900/55">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Aviso de frete */}
        <div className="mt-4 flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2.5">
          <ScooterIcon className="h-4 w-4 shrink-0 text-cream-050" />
          <p className="text-[11px] font-medium leading-snug text-cream-050">
            A taxa de entrega não está incluída — o valor do frete é informado
            pelo nosso WhatsApp na hora de fechar o pedido.
          </p>
        </div>

        {/* Atalhos de categoria */}
        <div className="mt-4 -mx-6 flex gap-2 overflow-x-auto px-6 pb-1">
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

        <div className="mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔎 Procurar hambúrguer, porção, sobremesa…"
            className="w-full rounded-full border border-ink-900/15 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-900/40 focus:border-red-500/60 focus:outline-none"
          />
        </div>
      </header>

      <div className="px-6">
        {searchResults ? (
          <div className="grid grid-cols-1 gap-3 pt-5 md:grid-cols-2">
            {searchResults.length === 0 ? (
              <p className="pt-6 text-center text-sm text-ink-900/50 md:col-span-2">
                Nada encontrado para &quot;{search}&quot;.
              </p>
            ) : (
              searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        ) : (
          menu.map((category) => {
            const isOpen = openCategory === category.id;
            return (
              <div
                key={category.id}
                ref={(el) => {
                  sectionRefs.current[category.id] = el;
                }}
                className="scroll-mt-[21rem] border-b border-ink-900/10 py-4"
              >
                <button
                  onClick={() => setOpenCategory(isOpen ? null : category.id)}
                  className="flex w-full items-center justify-between"
                >
                  <span className="font-display text-base font-semibold tracking-wide text-ink-900">
                    {category.name}
                  </span>
                  <span
                    className={`text-red-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {category.note && (
                      <p className="text-xs font-light text-ink-900/50 md:col-span-2">
                        {category.note}
                      </p>
                    )}
                    {category.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            );
          })
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
              Ver pedido
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

function ProductCard({
  product,
}: {
  product: { id: string; name: string; description: string; price: number };
}) {
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
          <p className="mt-2 text-sm font-semibold text-red-500">
            {formatBRL(product.price)}
          </p>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <QuantityStepper productId={product.id} />
      </div>
    </div>
  );
}
