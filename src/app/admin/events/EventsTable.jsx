import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DeleteEventButton from './DeleteEventButton';

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
            <TableHead>Available Tickets</TableHead>
            <TableHead className="text-right">Actions</TableHead>
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
              <TableCell>{event.availableTickets}</TableCell>
              <TableCell className="text-right">
                <DeleteEventButton slug={event.slug} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
