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
          throw new Error("Event was not found.");
        }
        return response.status(200).json(event);
      } catch (error) {
        return response.status(404).json({ message: error.message });
      }
    default:
      return response.status(405).json({ message: "Method not allowed" });

    case "DELETE":
      try {
        const eventResponse = await Event.findByIdAndDelete(id);
        if (!eventResponse) {
          response.status(404).json({ message: "No event found" });
          return;
        }
        return response
          .status(200)
          .json({ message: "Event successfully deleted." });
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
  }
}
