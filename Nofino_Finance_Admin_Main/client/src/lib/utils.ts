import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Type augmentation for ImportMeta to include env
interface ImportMetaEnv {
  VITE_WEB_URL: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  const apiUrl = import.meta.env.VITE_WEB_URL;
  return `${apiUrl}${path}`
}