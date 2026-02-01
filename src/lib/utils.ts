import { ERROR_DICTIONARY, ErrorDictionaryType } from "@/constants/error-dictionary";
import { ROUTES } from "@/constants/routes";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = (code: ErrorDictionaryType) => {
  const errorMessage = ERROR_DICTIONARY[code];
  return errorMessage || "Đã có lỗi xảy ra, vui lòng thử lại sau.";
}


export const getSafeRedirectUrl = (url: string | null, defaultUrl?: string) => {
  if (!url) return defaultUrl || ROUTES.HOME;
  if (!url.startsWith("/")) {
    return defaultUrl || ROUTES.HOME;
  }
  return decodeURIComponent(url);
}