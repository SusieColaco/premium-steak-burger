import { allProducts } from "@/lib/menu";
import { getCoupon, getDiscount } from "@/lib/coupons";

export type CheckoutInfo = {
  name: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  reference: string;
  neighborhood: string;
  city: string;
  notes: string;
  payment: "PIX" | "Dinheiro" | "Cartão na entrega" | "Cartão via link";
  coupon?: string;
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function buildOrderMessage(
  lines: { productId: string; quantity: number; note?: string }[],
  info: CheckoutInfo
) {
  const items = lines
    .map((line) => {
      const product = allProducts.find((p) => p.id === line.productId);
      if (!product) return null;
      return { product, quantity: line.quantity, note: line.note };
    })
    .filter(
      (
        x
      ): x is { product: (typeof allProducts)[number]; quantity: number; note: string | undefined } =>
        x !== null
    );

  const subtotal = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  const itemLines = items
    .map(
      ({ product, quantity, note }) =>
        `${product.name} x${quantity} — ${formatBRL(product.price * quantity)}${
          note ? `\n  Acompanhamento: ${note}` : ""
        }`
    )
    .join("\n");

  const coupon = getCoupon(info.coupon);
  const discount = getDiscount(subtotal, info.coupon);
  const couponLine = coupon
    ? `\nDesconto (${coupon.code} -${coupon.discountPercent}%): -${formatBRL(discount)}`
    : info.coupon?.trim()
      ? `\nCupom informado (não reconhecido): ${info.coupon.trim()}`
      : "";

  return `Olá! Gostaria de fazer o seguinte pedido:

${itemLines}

Subtotal: ${formatBRL(subtotal)}${couponLine}
Frete: a informar

Dados para entrega:
Nome: ${info.name}
Telefone: ${info.phone}
CEP: ${info.cep}
Endereço: ${info.street}, nº ${info.number}
Bairro: ${info.neighborhood}
Cidade: ${info.city}
Ponto de referência: ${info.reference || "-"}

Forma de pagamento: ${info.payment}

Observações: ${info.notes || "-"}`;
}
