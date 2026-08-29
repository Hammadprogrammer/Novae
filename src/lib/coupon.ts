import { useCallback, useEffect, useState } from "react";
import { COUPONS } from "./products";

const KEY = "novae-coupon";

export function useCoupon() {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    try {
      setCode(window.localStorage.getItem(KEY));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const apply = useCallback((raw: string) => {
    const c = raw.trim().toUpperCase();
    if (!COUPONS[c]) return false;
    setCode(c);
    try {
      window.localStorage.setItem(KEY, c);
    } catch {
      /* storage unavailable */
    }
    return true;
  }, []);

  const clear = useCallback(() => {
    setCode(null);
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const detail = code ? COUPONS[code] : null;

  const discountFor = useCallback(
    (subtotal: number) => {
      if (!detail) return 0;
      return detail.type === "percent"
        ? Math.round((subtotal * detail.value) / 100)
        : Math.min(detail.value, subtotal);
    },
    [detail],
  );

  return { code, detail, apply, clear, discountFor };
}
