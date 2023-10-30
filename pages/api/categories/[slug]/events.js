import dbConnect from "@/db/dbConnect.js";
import Event from "@/db/models/Events";
import { groupByProperty } from "@/lib/utils";

export default async function handler(request, response) {
  await dbConnect();
  const { slug, category, city } = request.query;
  const filter = {};
  switch (request.method) {
    case "GET":
      if (category) {
        filter.category = new RegExp(category, "i");
      }
      if (city) {
        filter.city = new RegExp(city, "i");
      }
      try {
        const events = await Event.find().populate("organizer").exec();
        const categories = groupByProperty(events, "category");

        const filteredCategories = categories.filter(
          (category) => category.slug === slug
        );

        const filteredEvents = await Event.find({
          ...filter,
          category: filteredCategories.at(0).name,
        });

        if (!filteredEvents) {
          return response(404).json({ message: "No events found." });
        }
        return response.status(200).json(filteredEvents);
      } catch (error) {
        return response.status(400).json({ message: error.message });
      }
    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
