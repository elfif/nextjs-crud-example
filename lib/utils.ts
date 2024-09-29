import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { E164Number } from 'libphonenumber-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @description type guard to check if a string is a valid E164 phone number
 * @param value 
 * @returns boolean
 */
export function isE164Number(value: string | undefined): value is E164Number {
  return value !== undefined && /^\+[1-9]\d{1,14}$/.test(value)
}

/**
 * @description format a date to a string
 * @param date
 * @returns 
 */
export function formatDate(date: Date | undefined): string {
  if (!date) {
    return ''
  }
  return date.toISOString().split('T')[0]
} 