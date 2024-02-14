import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function createSlug(title, city) {
  const processedTitle = title.trim().toLowerCase().replace(/ /g, '-');
  const processedCity = city.trim().toLowerCase().replace(/ /g, '-');

  const slug = processedTitle + '-' + processedCity;
  return slug;
}

export const checkEventExpired = (eventDate) =>
  new Date(eventDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
