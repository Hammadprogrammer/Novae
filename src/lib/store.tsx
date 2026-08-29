import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "./products";

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  qty: number;
};

export type OrderItem = CartItem & { name: string; price: number; image: string };

export type Order = {
  id: string;
  placedAt: string;
  deliveryDate: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  coupon: string | null;
  payment: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal: string;
    notes: string;
  };
  status: string;
};

type StoreValue = {
  ready: boolean;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  addToCart: (item: CartItem) => void;
  updateQty: (index: number, qty: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  addOrder: (order: Order) => void;
  cartCount: number;
  cartSubtotal: number;
  cartDetails: { item: CartItem; product: Product }[];
};

const StoreContext = createContext<StoreValue | null>(null);

const KEY = "novae-store-v1";

type Persisted = { cart: CartItem[]; wishlist: string[]; orders: Order[] };

function read(): Persisted {
  if (typeof window === "undefined") return { cart: [], wishlist: [], orders: [] };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { cart: [], wishlist: [], orders: [] };
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      cart: parsed.cart ?? [],
      wishlist: parsed.wishlist ?? [],
      orders: parsed.orders ?? [],
    };
  } catch {
    return { cart: [], wishlist: [], orders: [] };
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const data = read();
    setCart(data.cart);
    setWishlist(data.wishlist);
    setOrders(data.orders);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, orders }));
    } catch {
      /* storage unavailable */
    }
  }, [ready, cart, wishlist, orders]);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (c) => c.productId === item.productId && c.size === item.size && c.color === item.color,
      );
      if (idx === -1) return [...prev, item];
      const next = [...prev];
      next[idx] = { ...next[idx], qty: Math.min(10, next[idx].qty + item.qty) };
      return next;
    });
  }, []);

  const updateQty = useCallback((index: number, qty: number) => {
    setCart((prev) =>
      prev
        .map((c, i) => (i === index ? { ...c, qty: Math.max(0, Math.min(10, qty)) } : c))
        .filter((c) => c.qty > 0),
    );
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const cartDetails = useMemo(
    () =>
      cart
        .map((item) => {
          const product = PRODUCTS.find((p) => p.id === item.productId);
          return product ? { item, product } : null;
        })
        .filter((v): v is { item: CartItem; product: Product } => v !== null),
    [cart],
  );

  const value: StoreValue = {
    ready,
    cart,
    wishlist,
    orders,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    inWishlist: (id) => wishlist.includes(id),
    addOrder,
    cartCount: cart.reduce((s, c) => s + c.qty, 0),
    cartSubtotal: cartDetails.reduce((s, { item, product }) => s + product.price * item.qty, 0),
    cartDetails,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function generateOrderId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `NV-${new Date().getFullYear()}-${n}`;
}

export function deliveryEstimate(city: string) {
  const fast = ["Lahore", "Karachi", "Islamabad", "Rawalpindi"];
  const days = fast.includes(city) ? 3 : 5;
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

export const SHIPPING_FLAT = 250;
export const FREE_SHIPPING_THRESHOLD = 8000;
