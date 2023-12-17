import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const translateOrderStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "Odottaa käsittelyä";
    case "processing":
      return "Käsittelyssä";
    case "completed":
      return "Valmis";
    case "cancelled":
      return "Peruttu";
    default:
      return "Käsittelyssä";
  }
};
