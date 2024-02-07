import { events } from '@/data';

const EVENTS_BASE_URL = 'event-url';

export const getEvents = async () => {
  return events;
};

export const getOneEvent = async (slug) => {
  const event = events.filter((item) => item.slug === slug)[0];
  return event;
};

export const getEventsByCity = async (city) => {
  const searchedEvents = events.filter(
    (item) => item.city.toLowerCase() === city
  );
  return searchedEvents;
};
