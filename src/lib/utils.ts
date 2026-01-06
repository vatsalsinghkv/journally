import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDaysInMonth(month?: number, year?: number) {
  year = year || new Date().getFullYear();
  month = month || new Date().getMonth();
  return new Date(year, month + 1, 0).getDate();
}

export function getMonthName(month?: number) {
  month = month || new Date().getMonth();
  return new Date(0, month).toLocaleString("default", { month: "long" });
}

export function getLocalDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isActivePath(pathname: string, url: string) {
  const current = pathname.split("/").filter(Boolean);
  const target = url.split("/").filter(Boolean);

  // Case: root "/"
  if (url === "/") return pathname === "/";

  // If menu url has only one segment → match EXACT first segment
  // "/entries" should match ONLY "/entries"
  if (target.length === 1) {
    return current.length === 1 && current[0] === target[0];
  }

  // If menu url has deeper segments → match full exact path
  // "/entries/new" should only match "/entries/new"
  return pathname === url;
}
