import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { E164Number } from 'libphonenumber-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isE164Number(value: string | undefined): value is E164Number {
  return value !== undefined && /^\+[1-9]\d{1,14}$/.test(value)
}
