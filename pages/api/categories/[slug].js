import dbConnect from "@/db/dbConnect.js";
import Event from "@/db/models/Events";
import { groupByProperty } from "@/lib/utils";

export default async function handler(request, response) {
  await dbConnect();
  const { slug } = request.query;

  switch (request.method) {
    case "GET":
      try {
        const events = await Event.find().populate("organizer").exec();
        const categories = groupByProperty(events, "category");

        const filteredCategories = categories.filter(
          (category) => category.slug === slug
        );

        if (!filteredCategories) {
          return response(404).json({ message: "No category found." });
        }
        return response.status(200).json(filteredCategories.at(0));
      } catch (error) {
        return response.status(400).json({ message: error.message });
      }
    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
