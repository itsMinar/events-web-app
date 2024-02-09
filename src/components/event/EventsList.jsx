import PaginationControls from '../PaginationControls';
import EventCard from './EventCard';

export default function EventsList({ city, events, totalEvents, page = 1 }) {
  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : '';
  const nextPath =
    totalEvents > 6 * page ? `/events/${city}?page=${page + 1}` : '';

  return (
    <section className="flex max-w-[1100px] flex-wrap justify-center gap-10 px-[20px]">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}

      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
