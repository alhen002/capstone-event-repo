import dbConnect from "@/db/dbConnect.js";
import Event from "@/db/models/Events";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      const { queryCategory, queryCity } = request.query;
      try {
        const filter = {};
        if (queryCategory) {
          filter.category = { $regex: queryCategory, $options: `i` };
        }

        if (queryCity) {
          filter.city = { $regex: queryCity, $options: `i` };
        }
        console.log(filter);
        const filteredEvents = await Event.find(filter);

        if (filteredEvents.length === 0 || !filteredEvents) {
          return response.status(404).json({ message: "Events not found." });
        }

        return response.status(200).json(filteredEvents);
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
