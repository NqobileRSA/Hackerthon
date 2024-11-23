import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPhoneNumber = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 10);
};

export const formatIDNumber = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 13);
};
