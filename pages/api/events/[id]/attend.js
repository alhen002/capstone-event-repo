import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import dbConnect from "@/db/dbConnect";
import Event from "@/db/models/Events";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  const session = await getServerSession(request, response, authOptions);

  switch (request.method) {
    case "PUT":
      if (!session) {
        return response
          .status(401)
          .json({ message: "You've must be logged in to RSVP." });
      }
      const event = await Event.findById(id).populate("organizer").exec();
      if (!event) {
        return response
          .status(404)
          .json({ message: "The Event was not found." });
      }

      const newEvent = await Event.findByIdAndUpdate(id, {
        $addToSet: { attendingUsers: session.id },
      });

      return response.status(200).json({
        message: `Successfully added the user ${session.id} to the event with the id ${newEvent._id}`,
      });

    default:
      return response.status(405).json({ message: "Method not allowed." });
  }
}
