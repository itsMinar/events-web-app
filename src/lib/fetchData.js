import { events } from '@/data';

// fetch all events
export const getEvents = async () => {
  const response = await fetch(`${process.env.API_BASE_URL}/events`, {
    cache: 'no-store',
  });
  const events = await response.json();

  return events.data;
};

// get events filtered by city
export const getEventsByCity = async (city) => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/events?city=${city}`,
    { cache: 'no-store' }
  );
  const searchedEvents = await response.json();

  return searchedEvents.data;
};

// get a single event info
export const getOneEvent = async (slug) => {
  const event = events.filter((item) => item.slug === slug)[0];
  return event;
};
