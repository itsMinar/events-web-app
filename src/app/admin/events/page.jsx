import { getEvents } from '@/lib/fetchData';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import EventsTable from './EventsTable';
import MyPagination from './MyPagination';

const pageNumberSchema = z.coerce.number().int().positive().optional();
const EVENT_PER_PAGE = 20;

export default async function EventListPage({ searchParams }) {
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    redirect('/admin/events');
  }

  const fetchedData = await getEvents({
    pageNumber: parsedPage.data,
    limit: EVENT_PER_PAGE,
  });

  const events = fetchedData.data?.allEvents;
  const totalEvents = fetchedData.data?.totalEvents;
  const totalPage = fetchedData.data?.totalPage;

  if (totalPage < parsedPage.data) {
    redirect(`/admin/events?page=${totalPage}`);
  }

  const paths = Array(totalPage)
    .fill(0)
    .map((_, page) => ({
      params: `/admin/events?page=${page + 1}`,
      pageCount: page + 1,
    }));

  return (
    <div className="px-6 py-2">
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl">
        Available Event List
      </h1>

      <MyPagination
        paths={paths}
        page={parsedPage.data}
        totalEvents={totalEvents}
        eventPerPage={EVENT_PER_PAGE}
      />

      <EventsTable events={events} />
    </div>
  );
}
