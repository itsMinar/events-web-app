import EventsList from '@/components/event/EventsList';
import { Suspense } from 'react';
import Loading from './loading';

export default function EventsPage() {
  return (
    <main className="flex min-h-[110vh] flex-col items-center px-[20px] py-24">
      <h1 className="mb-28 text-3xl font-bold tracking-tight lg:text-6xl">
        All Events
      </h1>

      <Suspense key={1} fallback={<Loading />}>
        <EventsList />
      </Suspense>
    </main>
  );
}
