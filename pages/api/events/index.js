import dbConnect from "@/db/dbConnect.js";
import Event from "@/db/models/Events";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      try {
        const allEvents = await Event.find();

        if (allEvents.length === 0 || !allEvents) {
          return response.status(404).json({ message: "Events not found." });
        }
        return response.status(200).json(allEvents);
      } catch (error) {
        return response.status(400).json({ message: error.message });
      }

    case "POST":
      try {
        const newEvent = await Event.create(request.body);
        response
          .status(201)
          .json({ message: `Event ${newEvent._id} created.` });

        if (!newEvent) {
          throw new Error("Could not create event.");
        }
      } catch (error) {
        return response.status(400).json({ message: error.message });
      }

    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
