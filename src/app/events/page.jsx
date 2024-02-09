import EventsList from '@/components/event/EventsList';
import { getEvents } from '@/lib/fetchData';
import { Suspense } from 'react';
import Loading from './loading';

export default async function EventsPage() {
  const result = await getEvents();

  const events = result.data?.allEvents;
  const totalEvents = result.data?.totalEvents;

  return (
    <main className="flex min-h-[110vh] flex-col items-center px-[20px] py-24">
      <h1 className="mb-28 text-3xl font-bold tracking-tight lg:text-6xl">
        All Events
      </h1>

      <Suspense key={1} fallback={<Loading />}>
        {totalEvents > 0 ? (
          <EventsList events={events} />
        ) : (
          <div className="flex items-center justify-center">
            <h2 className="text-4xl font-medium text-red-500">
              There&apos;s no event right now!
            </h2>
          </div>
        )}
      </Suspense>
    </main>
  );
}
