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
    <div>
      <h1 className="text-3xl font-semibold">Available Event List</h1>

      <MyPagination
        className="mt-6"
        paths={paths}
        page={parsedPage.data}
        totalEvents={totalEvents}
        eventPerPage={EVENT_PER_PAGE}
      />

      <EventsTable events={events} />
    </div>
  );
}
