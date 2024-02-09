import EventsList from '@/components/event/EventsList';
import { getEvents } from '@/lib/fetchData';
import { capitalize } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { z } from 'zod';
import Loading from '../loading';

export function generateMetadata({ params }) {
  const city = params.city;

  return {
    title: city === 'all' ? 'All Events' : `Events in ${capitalize(city)}`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventsPage({ params, searchParams }) {
  const { city } = params;
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    redirect('/events/all');
  }

  const fetchedData = await getEvents(city, parsedPage.data);

  const events = fetchedData.data?.allEvents;
  const totalEvents = fetchedData.data?.totalEvents;
  const totalPage = fetchedData.data?.totalPage;

  if (totalPage < parsedPage.data) {
    redirect(`/events/${city}?page=${totalPage}`);
  }

  return (
    <main className="flex min-h-[110vh] flex-col items-center px-[20px] py-24">
      <h1 className="mb-28 text-3xl font-bold tracking-tight lg:text-6xl">
        {city === 'all' ? 'All Events' : `Events in ${capitalize(city)}`}
      </h1>

      <Suspense key={1} fallback={<Loading />}>
        {totalEvents > 0 ? (
          <EventsList
            city={city}
            events={events}
            totalEvents={totalEvents}
            page={parsedPage.data}
          />
        ) : (
          <div className="flex items-center justify-center">
            <h2 className="text-4xl font-medium text-red-500">
              There&apos;s no event {city !== 'all' && `in ${capitalize(city)}`}{' '}
              right now!
            </h2>
          </div>
        )}
      </Suspense>
    </main>
  );
}
