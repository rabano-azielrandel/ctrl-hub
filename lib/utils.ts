import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTomorrow() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

export function isSameDay(date1: string | Date, date2: string | Date) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function getDisplayDate(date: string | Date) {
  const input = new Date(date);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = getTomorrow();

  if (isSameDay(input, today)) return "Today";
  if (isSameDay(input, tomorrow)) return "Tomorrow";

  return input.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}