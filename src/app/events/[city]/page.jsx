import EventsList from '@/components/event/EventsList';
import { getEventsByCity } from '@/lib/fetchData';
import { capitalize } from '@/lib/utils';
import { Suspense } from 'react';
import Loading from '../loading';

export default async function EventsPage({ params }) {
  const { city } = params;
  const events = await getEventsByCity(city);

  return (
    <main className="flex min-h-[110vh] flex-col items-center px-[20px] py-24">
      <h1 className="mb-28 text-3xl font-bold tracking-tight lg:text-6xl">
        Events in {capitalize(city)}
      </h1>

      <Suspense key={1} fallback={<Loading />}>
        {events.data.length > 0 ? (
          <EventsList events={events.data} />
        ) : (
          <div className="flex items-center justify-center">
            <h2 className="text-4xl font-medium text-red-500">
              There&apos;s no event in {capitalize(city)} right now!
            </h2>
          </div>
        )}
      </Suspense>
    </main>
  );
}
