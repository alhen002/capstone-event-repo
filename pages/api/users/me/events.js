import dbConnect from "@/db/dbConnect";
import Event from "@/db/models/Events";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    return response
      .status(401)
      .json({ message: "You must be logged in to access this route." });
  }

  switch (request.method) {
    case "GET":
      const ownedEvents = await Event.find({ organizer: session.id })
        .populate("organizer")
        .exec();

      return response.status(200).json(ownedEvents);

    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}