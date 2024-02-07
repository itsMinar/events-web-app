import { Schema, model, models } from 'mongoose';

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    availableTickets: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    organizerName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// create Event model
const Event = models.Event || model('Event', eventSchema);

export default Event;
