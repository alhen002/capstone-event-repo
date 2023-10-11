import dbConnect from "@/db/dbConnect.js";
import Event from "@/db/models/Events";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      try {
        const allEvents = await Event.find();
        if (allEvents.length === 0 || !allEvents) {
          return response.status(404).json({ status: "Not Found" });
        }
        return response.status(200).json(allEvents);
      } catch (error) {
        return response.status(400).json(error);
      }
  }
}
