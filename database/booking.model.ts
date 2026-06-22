import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { Event } from "./event.model";

interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
  },
  { timestamps: true }
);

// Add index on eventId for faster queries
bookingSchema.index({ eventId: 1 });

// Validate that referenced event exists before saving booking
bookingSchema.pre<IBooking>("save", async function () {
  // Check if eventId has been modified
  if (!this.isModified("eventId")) {
    return;
  }

  // Verify the referenced event exists in the database
  const eventExists = await Event.findById(this.eventId);

  if (!eventExists) {
    throw new Error(`Event with ID ${this.eventId} does not exist`);
  }
});

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);

export { Booking };
export type { IBooking };
