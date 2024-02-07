import EventCard from './EventCard';

export default function EventsList({ events }) {
  return (
    <section className="flex max-w-[1100px] flex-wrap justify-center gap-10 px-[20px]">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </section>
  );
}
