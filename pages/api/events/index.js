import dbConnect from "@/db/dbConnect.js";
import Event from "@/db/models/Events";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      const { category, city } = request.query;

      try {
        const filter = {};
        if (category) {
          filter.category = new RegExp(category, "i");
        }
        if (city) {
          filter.city = new RegExp(city, "i");
        }

        const filteredEvents = await Event.find(filter)
          .populate("organizer")
          .exec();
        return response.status(200).json(filteredEvents);
      } catch (error) {
        return response.status(400).json({ message: error.message });
      }
    case "POST":
      const session = await getServerSession(request, response, authOptions);
      if (!session) {
        return response
          .status(401)
          .json({ message: "You must be logged in to create a new event." });
      }
      try {
        const newEvent = await Event.create({
          ...request.body,
          organizer: session.id,
        });
        return response
          .status(201)
          .json({ message: `Event ${newEvent._id} created.` });

        if (!newEvent) {
          throw new Error("Could not create event.");
        }
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
