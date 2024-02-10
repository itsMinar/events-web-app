// get Events
export const getEvents = async ({
  city = 'all',
  pageNumber = 1,
  limit = 6,
}) => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/events?city=${city}&page=${pageNumber}&limit=${limit}`,
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
