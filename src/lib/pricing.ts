import { pricing } from "@/config/site";

export type PlanId = (typeof pricing.plans)[number]["id"];

export function computePrice(basePrice: number, discountPercent: number) {
  const newPrice = Math.round((basePrice * (100 - discountPercent)) / 100);
  return { oldPrice: basePrice, newPrice, discountPercent };
}

export function formatPrice(value: number) {
  // 8000 -> "8 000"
  return new Intl.NumberFormat("ru-RU").format(value);
}
