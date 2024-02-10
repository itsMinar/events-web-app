import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function EventsTable({ events }) {
  return (
    <div className="mt-6 px-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Organizer</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Available Tickets</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event._id}>
              <TableCell className="font-medium">{event.name}</TableCell>
              <TableCell>{event.organizerName}</TableCell>
              <TableCell>{event.city}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell className="text-right">
                {event.availableTickets}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
