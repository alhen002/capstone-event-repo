import dbConnect from "@/db/dbConnect.js";
import Event from "@/db/models/Events";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      const { category, city, search } = request.query;
      if (search) {
        const searchedEvents = await Event.find({
          title: new RegExp(search, "i"),
        }).exec();
        return response.status(200).json(searchedEvents);
      }

      try {
        const filter = {};
        if (category) {
          filter.category = new RegExp(category, "i");
        }
        if (city) {
          filter.city = new RegExp(city, "i");
        }

        const filteredEvents = await Event.find(filter);
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
