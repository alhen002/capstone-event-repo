import dbConnect from "@/db/dbConnect.js";
import Event from "@/db/models/Events";
import { groupByProperty } from "@/lib/utils";

export default async function handler(request, response) {
  await dbConnect();
  switch (request.method) {
    case "GET":
      try {
        const events = await Event.find();
        const cities = groupByProperty(events, "city");
        return response.status(200).json(cities);
      } catch (error) {
        return response.status(400).json({ message: error.message });
      }
    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
