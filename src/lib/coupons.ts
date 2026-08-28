export type Coupon = {
  code: string;
  discountPercent: number;
};

const COUPONS: Coupon[] = [
  { code: "PREMIUM5", discountPercent: 5 },
  { code: "PREMIUM10", discountPercent: 10 },
];

export function getCoupon(code: string | undefined): Coupon | null {
  const normalized = code?.trim().toUpperCase();
  if (!normalized) return null;
  return COUPONS.find((c) => c.code === normalized) ?? null;
}

export function getDiscount(subtotal: number, code: string | undefined) {
  const coupon = getCoupon(code);
  if (!coupon) return 0;
  return Math.round(subtotal * (coupon.discountPercent / 100) * 100) / 100;
}
