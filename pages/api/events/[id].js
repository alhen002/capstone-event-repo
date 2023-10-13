import dbConnect from "@/db/dbConnect.js";
import Event from "@/db/models/Events";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  switch (request.method) {
    case "GET":
      try {
        const event = await Event.findById(id);
        if (!event) {
          return response.status(404).json({ message: "Event not found." });
        }
        return response.status(200).json(event);
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    case "PUT":
      try {
        const event = await Event.findByIdAndUpdate(id, request.body);
        if (!event) {
          return response
            .status(404)
            .json({ message: "Event not found. Could not be updated." });
        }
        return response
          .status(200)
          .json({ message: `Event with id ${event._id} updated.` });
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }

    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}