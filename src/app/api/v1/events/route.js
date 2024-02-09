import connectDB from '@/db';
import { ApiResponse } from '@/lib/ApiResponse';
import { capitalize } from '@/lib/utils';
import Event from '@/models/Event.model';
import { NextResponse } from 'next/server';

// Get All Events - GET Request
export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams;
  const city = searchParams.get('city') || 'all';
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 6;

  try {
    await connectDB();

    const allEvents =
      city === 'all'
        ? await Event.find()
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .sort({ createdAt: -1 })
        : await Event.find({ city: capitalize(city) })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .sort({ createdAt: -1 });

    // calculate total events number
    const totalEvents =
      city === 'all'
        ? await Event.estimatedDocumentCount()
        : await Event.countDocuments({ city: capitalize(city) });

    // calculate total page number
    const totalPage = Math.ceil(totalEvents / limitNum);

    // return response
    return NextResponse.json(
      new ApiResponse(
        200,
        { allEvents, totalEvents, totalPage },
        'All Events fetched Successfully.'
      )
    );
  } catch (error) {
    return NextResponse.json(new ApiResponse(500, null, error.message));
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
      return NextResponse.json(
        new ApiResponse(400, null, 'All fields are required')
      );
    }

    // check if event already exists: slug
    const eventEsist = await Event.findOne({ slug });
    if (eventEsist) {
      return NextResponse.json(
        new ApiResponse(409, null, 'Event already exists')
      );
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
      return NextResponse.json(
        new ApiResponse(
          500,
          null,
          'Something went wrong while creating the event'
        )
      );
    }

    // return response
    return NextResponse.json(
      new ApiResponse(201, event, 'Event Added Successfully!')
    );
  } catch (error) {
    return NextResponse.json(new ApiResponse(500, null, error.message));
  }
}
