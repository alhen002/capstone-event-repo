import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
  title: { type: String },
  city: { type: String },
  category: { type: String },
  description: { type: String },
  image_url: { type: String },
  start_date_time: { type: String },
  end_date_time: { type: String },
  organizer: { type: String },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
