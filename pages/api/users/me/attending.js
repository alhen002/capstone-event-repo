import dbConnect from "@/db/dbConnect";
import Event from "@/db/models/Events";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const { category, city } = request.query;
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    return response
      .status(401)
      .json({ message: "You must be logged in to access this route." });
  }

  switch (request.method) {
    case "GET":
      const filter = {};
      if (category) {
        filter.category = new RegExp(category, "i");
      }
      if (city) {
        filter.city = new RegExp(city, "i");
      }
      const ownedEvents = await Event.find({
        ...filter,
        attendingUsers: session.id,
      })
        .populate("organizer")
        .exec();

      return response.status(200).json(ownedEvents);

    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
