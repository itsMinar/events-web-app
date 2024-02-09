// get Events
export const getEvents = async (city = 'all', pageNumber = 1) => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/events?city=${city}&page=${pageNumber}`,
    { cache: 'no-store' }
  );
  const searchedEvents = await response.json();

  return searchedEvents;
};

// get a single event info
export const getOneEvent = async (slug) => {
  const response = await fetch(`${process.env.API_BASE_URL}/events/${slug}`);
  const event = await response.json();

  return event;
};
