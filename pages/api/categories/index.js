import dbConnect from "@/db/dbConnect.js";
import Event from "@/db/models/Events";
import { groupByProperty } from "@/lib/utils";

export default async function handler(request, response) {
  await dbConnect();
  const { category, city } = request.query;
  switch (request.method) {
    case "GET":
      try {
        const filter = {};
        if (category) {
          filter.category = new RegExp(category, "i");
        }
        if (city) {
          filter.city = new RegExp(city, "i");
        }

        const events = await Event.find(filter).populate("organizer").exec();
        const categories = groupByProperty(events, "category");

        return response.status(200).json(categories);
      } catch (error) {
        return response.status(400).json({ message: error.message });
      }
    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
