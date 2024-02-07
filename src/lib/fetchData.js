// fetch all events
export const getEvents = async () => {
  const response = await fetch(`${process.env.API_BASE_URL}/events`, {
    cache: 'no-store',
  });
  const events = await response.json();

  return events;
};

// get events filtered by city
export const getEventsByCity = async (city) => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/events?city=${city}`,
    { cache: 'no-store' }
  );
  const searchedEvents = await response.json();

  return searchedEvents;
};

// get a single event info
export const getOneEvent = async (slug) => {
  const response = await fetch(`${process.env.API_BASE_URL}/events/${slug}`, {
    cache: 'no-store',
  });
  const event = await response.json();

  return event;
};
