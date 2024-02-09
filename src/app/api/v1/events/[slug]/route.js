import connectDB from '@/db';
import { ApiResponse } from '@/lib/ApiResponse';
import Event from '@/models/Event.model';
import { NextResponse } from 'next/server';

// Get Single Event - GET Request
export async function GET(req, { params }) {
  const { slug } = params;

  try {
    await connectDB();

    const event = await Event.findOne({ slug });

    if (!event) {
      return NextResponse.json(new ApiResponse(404, null, 'Event not found!'));
    }

    // return response
    return NextResponse.json(
      new ApiResponse(200, event, `Event fetched Successfully.`)
    );
  } catch (error) {
    return NextResponse.json(new ApiResponse(500, null, error.message));
  }
}

// UPDATE ticket info - availableTickets
export async function PATCH(req, { params }) {
  const { slug } = params;
  const { tickets } = await req.json();

  // validation - not empty
  if (!tickets) {
    return NextResponse.json(
      new ApiResponse(400, null, 'You must give a ticket number more than 0!')
    );
  }

  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    if (!event) {
      return NextResponse.json(new ApiResponse(404, null, 'Event not found!'));
    }

    if (event.availableTickets > 0 && tickets <= event.availableTickets) {
      event.availableTickets = event.availableTickets - tickets;
      await event.save();
    } else {
      return NextResponse.json(
        new ApiResponse(
          404,
          null,
          `Sorry, you can not buy tickets more than available.`
        )
      );
    }

    // return response
    return NextResponse.json(
      new ApiResponse(200, event, `Event updated Successfully.`)
    );
  } catch (error) {
    return NextResponse.json(new ApiResponse(500, null, error.message));
  }
}
