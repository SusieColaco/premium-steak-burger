import { allProducts } from "@/lib/menu";

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
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function buildOrderMessage(
  lines: { productId: string; quantity: number }[],
  info: CheckoutInfo
) {
  const items = lines
    .map((line) => {
      const product = allProducts.find((p) => p.id === line.productId);
      if (!product) return null;
      return { product, quantity: line.quantity };
    })
    .filter((x): x is { product: (typeof allProducts)[number]; quantity: number } => x !== null);

  const subtotal = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  const itemLines = items
    .map(
      ({ product, quantity }) =>
        `${product.name} x${quantity} — ${formatBRL(product.price * quantity)}`
    )
    .join("\n");

  return `Olá! Gostaria de fazer o seguinte pedido:

${itemLines}

Subtotal: ${formatBRL(subtotal)}
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
