const EVENTS_BASE_URL = 'event-url';

export const getEvents = async () => {
  const res = await fetch(EVENTS_BASE_URL);
  return res.json();
};

export const getOneEvent = async (eventId) => {
  const res = await fetch(`${EVENTS_BASE_URL}/${eventId}`);
  return res.json();
};
