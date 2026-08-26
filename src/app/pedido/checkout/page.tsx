"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { allProducts } from "@/lib/menu";
import { buildOrderMessage, type CheckoutInfo } from "@/lib/order-message";
import { waLink } from "@/lib/config";
import { getDeliveryFee, getAvailableNeighborhoods } from "@/lib/delivery-fees";
import { getCoupon, getDiscount } from "@/lib/coupons";
import { ScooterIcon } from "@/components/icons";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const PAYMENT_OPTIONS: CheckoutInfo["payment"][] = [
  "PIX",
  "Dinheiro",
  "Cartão na entrega",
  "Cartão via link",
];

function formatCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export default function CheckoutPage() {
  const { lines, subtotal, itemCount, setQuantity, clear } = useCart();
  const router = useRouter();
  const numberFieldRef = useRef<HTMLInputElement>(null);

  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    reference: "",
    neighborhood: "",
    city: "Guarapuava - PR",
    notes: "",
    payment: "PIX" as CheckoutInfo["payment"],
    coupon: "",
  });

  const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [addressLocked, setAddressLocked] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const coupon = getCoupon(form.coupon);
  const discount = getDiscount(subtotal, form.coupon);
  const total = subtotal - discount + deliveryFee;

  const items = useMemo(
    () =>
      lines
        .map((line) => ({
          line,
          product: allProducts.find((p) => p.id === line.productId),
        }))
        .filter((x): x is { line: typeof lines[number]; product: NonNullable<(typeof x)["product"]> } => !!x.product),
    [lines]
  );

  const isValid =
    form.name.trim() &&
    form.phone.trim() &&
    (orderType === "pickup" || (form.street.trim() && form.number.trim() && form.neighborhood.trim() && deliveryFee > 0));

  function handleChange(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));

      if (field === "neighborhood") {
        const fee = getDeliveryFee(value);
        setDeliveryFee(fee ?? 0);
      }
    };
  }

  async function handleCepChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCep(e.target.value);
    setForm((prev) => ({ ...prev, cep: formatted }));
    setAddressLocked(false);

    const digits = formatted.replace(/\D/g, "");
    if (digits.length !== 8) {
      setCepStatus("idle");
      return;
    }

    setCepStatus("loading");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepStatus("error");
        return;
      }
      setForm((prev) => ({
        ...prev,
        street: data.logradouro || prev.street,
        neighborhood: data.bairro || prev.neighborhood,
        city: data.localidade ? `${data.localidade} - ${data.uf}` : prev.city,
      }));
      setCepStatus("done");
      setAddressLocked(true);
      numberFieldRef.current?.focus();
    } catch {
      setCepStatus("error");
    }
  }

  function handleSubmit() {
    if (!isValid) return;
    const message = buildOrderMessage(lines, form);
    const url = waLink(message);
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "generate_lead", {
              event_category: "pedido",
              event_label: orderType,
              value: total,
        });
    }
    window.open(url, "_blank", "noopener,noreferrer");
    clear();
    router.push("/");
  }

  if (itemCount === 0) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center bg-cream-050 px-6 text-center md:max-w-2xl">
        <p className="text-sm text-ink-900/60">Seu carrinho está vazio.</p>
        <Link
          href="/pedido"
          className="mt-4 rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-cream-050"
        >
          Ver cardápio
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col bg-cream-050 pb-40 md:max-w-2xl">
      <header className="sticky top-0 z-20 border-b border-ink-900/10 bg-cream-050/95 px-6 py-5 backdrop-blur">
        <div className="mb-3 flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="Premium Steak Burger"
            width={766}
            height={290}
            className="h-8 w-auto brightness-0"
          />
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/pedido"
            className="text-xs font-semibold uppercase tracking-wide text-ink-900/60 transition-colors hover:text-red-500"
          >
            ← Cardápio
          </Link>
          <h1 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink-900">
            Finalizar Pedido
          </h1>
          <span className="w-16" />
        </div>
      </header>

      <section className="px-6 pt-5">
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
          Seu pedido
        </h2>

        <div className="mt-3 flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2.5">
          <ScooterIcon className="h-4 w-4 shrink-0 text-cream-050" />
          <p className="text-[11px] font-medium leading-snug text-cream-050">
            A taxa de entrega não está incluída. O valor do frete é informado
            pelo nosso WhatsApp na hora de fechar o pedido.
          </p>
        </div>

        <div className="mt-3 flex flex-col gap-2 rounded-[14px] border border-ink-900/10 bg-white p-4">
          {items.map(({ line, product }) => (
            <div key={line.productId} className="flex items-center justify-between text-sm">
              <div>
                <span className="text-ink-900">{product.name}</span>
                <span className="ml-2 text-ink-900/40">x{line.quantity}</span>
                {line.note && (
                  <p className="mt-0.5 text-xs text-ink-900/50">{line.note}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-ink-900/80">
                  {formatBRL(product.price * line.quantity)}
                </span>
                <button
                  onClick={() => setQuantity(line.productId, 0)}
                  aria-label="Remover"
                  className="text-ink-900/40 transition-colors hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-ink-900/10 pt-3 text-sm">
            <div className="flex justify-between font-semibold">
              <span className="text-ink-900">Subtotal</span>
              <span className="text-red-500">{formatBRL(subtotal)}</span>
            </div>
            {coupon && (
              <div className="flex justify-between">
                <span className="text-green">
                  Desconto ({coupon.code} -{coupon.discountPercent}%)
                </span>
                <span className="text-green">-{formatBRL(discount)}</span>
              </div>
            )}
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <span className="text-ink-900/80">Frete</span>
                <span className="text-ink-900/80">{formatBRL(deliveryFee)}</span>
              </div>
            )}
            {(deliveryFee > 0 || coupon) && (
              <div className="flex justify-between border-t border-ink-900/10 pt-2 font-semibold">
                <span className="text-ink-900">Total</span>
                <span className="text-red-500">{formatBRL(total)}</span>
              </div>
            )}
          </div>
        </div>

        {deliveryFee === 0 && form.neighborhood !== "" && (
          <div className="mt-3 flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2.5 border border-red-500/25">
            <ScooterIcon className="h-4 w-4 shrink-0 text-red-500" />
            <p className="text-[11px] font-medium leading-snug text-red-500">
              Bairro não encontrado na lista de entrega. Confirme pelo WhatsApp.
            </p>
          </div>
        )}
      </section>

      <section className="px-6 pt-8">
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
          Tipo de Pedido
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setOrderType("delivery");
              setDeliveryFee(0);
            }}
            className={`rounded-full border px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
              orderType === "delivery"
                ? "border-red-500 bg-red-500 text-cream-050"
                : "border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/40"
            }`}
          >
            🛵 Entrega
          </button>
          <button
            onClick={() => {
              setOrderType("pickup");
              setDeliveryFee(0);
            }}
            className={`rounded-full border px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
              orderType === "pickup"
                ? "border-red-500 bg-red-500 text-cream-050"
                : "border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/40"
            }`}
          >
            🏪 Retirada
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 px-1">
          <span className="text-xs">⏱️</span>
          <p className="text-[11px] font-medium leading-snug text-ink-900/50">
            Tempo estimado: 40 a 60 minutos
          </p>
        </div>
      </section>

      <section className="px-6 pt-8">
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
          Dados Pessoais
        </h2>
        <div className="mt-3 flex flex-col gap-3">
          <Field label="Nome" value={form.name} onChange={handleChange("name")} required />
          <Field
            label="Telefone"
            value={form.phone}
            onChange={handleChange("phone")}
            required
            placeholder="(42) 9 9999-9999"
          />

          {orderType === "delivery" && (
            <>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wide text-ink-900/50">
                  CEP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.cep}
                  onChange={handleCepChange}
                  placeholder="00000-000"
                  className="w-full rounded-full border border-ink-900/15 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-900/35 focus:border-red-500/60 focus:outline-none"
                />
                {cepStatus === "loading" && (
                  <p className="mt-1.5 text-xs text-ink-900/50">Buscando endereço…</p>
                )}
                {cepStatus === "done" && (
                  <p className="mt-1.5 text-xs text-green">
                    Endereço encontrado — confira abaixo.
                  </p>
                )}
                {cepStatus === "error" && (
                  <p className="mt-1.5 text-xs text-red-500">
                    CEP não encontrado, preencha o endereço manualmente.
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Field
                  label="Endereço"
                  value={form.street}
                  onChange={handleChange("street")}
                  required
                  className="flex-[2]"
                  highlight={addressLocked}
                />
                <div className="flex-1">
                  <label className="mb-1.5 block text-xs uppercase tracking-wide text-ink-900/50">
                    Número <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={numberFieldRef}
                    type="text"
                    value={form.number}
                    onChange={handleChange("number")}
                    className="w-full rounded-full border border-ink-900/15 bg-white px-4 py-2.5 text-sm text-ink-900 focus:border-red-500/60 focus:outline-none"
                  />
                </div>
              </div>
              <NeighborhoodField
                value={form.neighborhood}
                onChange={handleChange("neighborhood")}
                highlight={addressLocked}
              />
              <Field
                label="Cidade"
                value={form.city}
                onChange={handleChange("city")}
                highlight={addressLocked}
              />
              <Field
                label="Ponto de referência"
                value={form.reference}
                onChange={handleChange("reference")}
                placeholder="Ex: portão azul, perto do mercado X…"
              />
              <p className="-mt-1.5 text-[11px] text-ink-900/45">
                Ajuda o entregador a encontrar sua casa mais rápido.
              </p>
            </>
          )}
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-wide text-ink-900/50">
              Observações
            </label>
            <textarea
              value={form.notes}
              onChange={handleChange("notes")}
              placeholder="Sem cebola, trocar batata…"
              rows={3}
              className="w-full rounded-[14px] border border-ink-900/15 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-900/35 focus:border-red-500/60 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="px-6 pt-8">
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
          Forma de pagamento
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {PAYMENT_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => setForm((prev) => ({ ...prev, payment: option }))}
              className={`rounded-full border px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 ${
                form.payment === option
                  ? "border-red-500 bg-red-500 text-cream-050"
                  : "border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/40"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 pt-8">
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
          Cupom de desconto
        </h2>
        <div className="mt-3">
          <input
            type="text"
            value={form.coupon}
            onChange={handleChange("coupon")}
            placeholder="🏷️ Código do cupom (opcional)"
            className="w-full rounded-full border border-ink-900/15 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-900/35 focus:border-red-500/60 focus:outline-none"
          />
          {coupon && (
            <p className="mt-1.5 text-xs text-green">
              Cupom aplicado: {coupon.discountPercent}% de desconto (
              {formatBRL(discount)}).
            </p>
          )}
          {!coupon && form.coupon.trim() && (
            <p className="mt-1.5 text-xs text-red-500">Cupom inválido.</p>
          )}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md px-4 pb-4 md:max-w-2xl">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-4 text-sm font-semibold tracking-wide text-cream-050 shadow-[0_8px_30px_rgba(228,39,44,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          Enviar Pedido pelo WhatsApp
        </button>
      </div>
    </main>
  );
}

function NeighborhoodField({
  value,
  onChange,
  highlight = false,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  highlight?: boolean;
}) {
  const neighborhoods = getAvailableNeighborhoods();
  const fee = getDeliveryFee(value);

  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wide text-ink-900/50">
        Bairro <span className="text-red-500">*</span>
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full rounded-full border bg-white px-4 py-2.5 text-sm text-ink-900 focus:border-red-500/60 focus:outline-none ${
          highlight ? "border-green/50" : "border-ink-900/15"
        }`}
      >
        <option value="">Selecione seu bairro…</option>
        {neighborhoods.map((neighborhood) => (
          <option key={neighborhood} value={neighborhood}>
            {neighborhood} (R$ {getDeliveryFee(neighborhood)?.toFixed(2)})
          </option>
        ))}
      </select>
      {value && fee && (
        <p className="mt-1.5 text-xs text-green">
          Frete: {formatBRL(fee)}
        </p>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
  className = "",
  highlight = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs uppercase tracking-wide text-ink-900/50">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-full border bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-900/35 focus:border-red-500/60 focus:outline-none ${
          highlight ? "border-green/50" : "border-ink-900/15"
        }`}
      />
    </div>
  );
}
