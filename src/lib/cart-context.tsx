"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { allProducts } from "@/lib/menu";

const STORAGE_KEY = "premium-cart-v1";

type CartLine = { productId: string; quantity: number; note?: string };

type CartContextValue = {
  lines: CartLine[];
  quantityOf: (productId: string) => number;
  noteOf: (productId: string) => string | undefined;
  setQuantity: (productId: string, quantity: number) => void;
  setNote: (productId: string, note: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
  isHydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage after mount (unavailable during SSR).
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, isHydrated]);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      const next = prev.filter((l) => l.productId !== productId);
      if (quantity > 0) {
        next.push({ productId, quantity, note: existing?.note });
      }
      return next;
    });
  }, []);

  const setNote = useCallback((productId: string, note: string) => {
    setLines((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, note } : l))
    );
  }, []);

  const quantityOf = useCallback(
    (productId: string) =>
      lines.find((l) => l.productId === productId)?.quantity ?? 0,
    [lines]
  );

  const noteOf = useCallback(
    (productId: string) => lines.find((l) => l.productId === productId)?.note,
    [lines]
  );

  const increment = useCallback(
    (productId: string) => setQuantity(productId, quantityOf(productId) + 1),
    [quantityOf, setQuantity]
  );

  const decrement = useCallback(
    (productId: string) =>
      setQuantity(productId, Math.max(0, quantityOf(productId) - 1)),
    [quantityOf, setQuantity]
  );

  const clear = useCallback(() => setLines([]), []);

  const { itemCount, subtotal } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const line of lines) {
      const product = allProducts.find((p) => p.id === line.productId);
      if (!product) continue;
      count += line.quantity;
      total += product.price * line.quantity;
    }
    return { itemCount: count, subtotal: total };
  }, [lines]);

  return (
    <CartContext.Provider
      value={{
        lines,
        quantityOf,
        noteOf,
        setQuantity,
        setNote,
        increment,
        decrement,
        clear,
        itemCount,
        subtotal,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
