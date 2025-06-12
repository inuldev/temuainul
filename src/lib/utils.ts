import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import humanizeDuration from "humanize-duration";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
    language: "id",
  });
}

// Utility functions untuk format tanggal dengan locale Indonesia
export function formatDate(date: Date | string, pattern: string) {
  return format(new Date(date), pattern, { locale: id });
}

export function formatDateShort(date: Date | string) {
  return format(new Date(date), "d MMM", { locale: id });
}

export function formatDateLong(date: Date | string) {
  return format(new Date(date), "PPP", { locale: id });
}

export function formatDateTime(date: Date | string) {
  return format(new Date(date), "PPP 'pukul' HH:mm", { locale: id });
}
