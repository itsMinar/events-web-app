'use server';

import { revalidatePath } from 'next/cache';

// Buy tickets
export async function buyTickets(slug, tickets) {
  const res = await fetch(`${process.env.API_BASE_URL}/events/${slug}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tickets }),
  });
  const data = await res.json();

  revalidatePath(`events/${slug}`);

  return data;
}

// Add event
export async function addEvent(eventDetails) {
  const res = await fetch(`${process.env.API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventDetails),
  });

  return res.json();
}
