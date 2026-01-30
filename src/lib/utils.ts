import { ERROR_DICTIONARY, ErrorDictionaryType } from "@/constants/error-dictionary";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = (code: ErrorDictionaryType) => {
  const errorMessage = ERROR_DICTIONARY[code];
  return errorMessage || "Đã có lỗi xảy ra, vui lòng thử lại sau.";
}
