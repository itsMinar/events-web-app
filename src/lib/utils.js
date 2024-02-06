import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function createSlug(title) {
  const slug = title.trim().toLowerCase().replace(/ /g, '-');
  return slug;
}
