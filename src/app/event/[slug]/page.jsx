import { events } from '@/data';

export default function EventPage({ params }) {
  const { slug } = params;
  const event = events.filter((item) => item.slug === slug)[0];

  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-medium">
        Event Name: <span className="text-lime-600">{event.name}</span>
      </h1>
    </div>
  );
}
