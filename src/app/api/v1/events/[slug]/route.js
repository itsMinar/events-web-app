import connectDB from '@/db';
import { ApiResponse } from '@/lib/ApiResponse';
import Event from '@/models/Event.model';

// Get Single Event - GET Request
export async function GET(req, { params }) {
  const { slug } = params;

  try {
    await connectDB();

    const event = await Event.findOne({ slug });

    if (!event) {
      return Response.json(new ApiResponse(404, null, 'Event not found!'));
    }

    // return response
    return Response.json(
      new ApiResponse(200, event, `Event fetched Successfully.`)
    );
  } catch (error) {
    return Response.json(new ApiResponse(500, null, error.message));
  }
}
