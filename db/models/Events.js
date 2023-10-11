import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
  title: { type: String },
  city: { type: String },
  category: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  startDateTime: { type: Date },
  endDateTime: { type: Date },
  organizer: { type: String },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
