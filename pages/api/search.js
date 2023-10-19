import dbConnect from "@/db/dbConnect.js";
import Event from "@/db/models/Events";

export default async function handler(request, response) {
  await dbConnect();
  const { events } = request.query;

  switch (request.method) {
    case "GET":
      if (events) {
        let regex = new RegExp(events, "i");
        const searchedEvents = await Event.find({
          $and: [{ $or: [{ title: regex }, { description: regex }] }],
        }).exec();
        return response.status(200).json(searchedEvents);
      }

    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
