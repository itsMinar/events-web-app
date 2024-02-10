import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function MyPagination({
  paths,
  page = 1,
  totalEvents,
  eventPerPage,
}) {
  const previousPath = page > 1 ? `/admin/events?page=${page - 1}` : '';
  const nextPath =
    totalEvents > eventPerPage * page ? `/admin/events?page=${page + 1}` : '';

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={previousPath} />
        </PaginationItem>

        {paths.map((path) => (
          <PaginationItem key={path.params}>
            <PaginationLink
              href={path.params}
              isActive={path.pageCount === page}
            >
              {path.pageCount}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href={nextPath} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
