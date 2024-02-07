import connectDB from '@/db';
import { ApiResponse } from '@/lib/ApiResponse';
import { capitalize } from '@/lib/utils';
import Event from '@/models/Event.model';

// Get All Events - GET Request
export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams;
  const myParam = searchParams.get('city');

  try {
    await connectDB();

    if (myParam) {
      const searchedEvents = await Event.find({ city: capitalize(myParam) });

      return Response.json(
        new ApiResponse(
          200,
          searchedEvents,
          `Events in ${myParam} fetched Successfully.`
        )
      );
    }

    const allEvents = await Event.find();

    // return response
    return Response.json(
      new ApiResponse(200, allEvents, 'All Events fetched Successfully.')
    );
  } catch (error) {
    return Response.json(new ApiResponse(500, null, error.message));
  }
}

// Add new Event - POST Request
export async function POST(req, res) {
  try {
    await connectDB();

    const {
      name,
      slug,
      city,
      location,
      availableTickets,
      date,
      organizerName,
      imageUrl,
      description,
    } = await req.json();

    // validation - not empty
    if (
      !name ||
      !slug ||
      !city ||
      !location ||
      !availableTickets ||
      !date ||
      !organizerName ||
      !imageUrl ||
      !description
    ) {
      return Response.json(
        new ApiResponse(400, null, 'All fields are required')
      );
    }

    // check if event already exists: slug
    const eventEsist = await Event.findOne({ slug });
    if (eventEsist) {
      return Response.json(new ApiResponse(409, null, 'Event already exists'));
    }

    // create event object - create entry in DB
    const event = await Event.create({
      name,
      slug,
      city,
      location,
      availableTickets,
      date,
      organizerName,
      imageUrl,
      description,
    });

    // check for event creation
    if (!event) {
      return Response.json(
        new ApiResponse(
          500,
          null,
          'Something went wrong while creating the event'
        )
      );
    }

    // return response
    return Response.json(
      new ApiResponse(201, event, 'Event Added Successfully!')
    );
  } catch (error) {
    return Response.json(new ApiResponse(500, null, error.message));
  }
}
