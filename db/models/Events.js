import mongoose from "mongoose";
const { Schema } = mongoose;
const eventSchema = new Schema(
  {
    title: { type: String },
    city: { type: String },
    address: { type: String },
    coordinates: { lng: Number, lat: Number },
    postalCode: { type: String },
    country: { type: String },
    category: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    startDateTime: { type: Date },
    endDateTime: { type: Date },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    attendingUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: {
      createAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
