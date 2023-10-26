import dbConnect from "@/db/dbConnect.js";
import Event from "@/db/models/Events";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import User from "@/db/models/Users";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  const session = await getServerSession(request, response, authOptions);

  switch (request.method) {
    case "GET":
      try {
        const event = await Event.findById(id)
          .populate("organizer")
          .populate("attendingUsers")
          .exec();
        if (!event) {
          return response.status(404).json({ message: "Event not found." });
        }
        return response.status(200).json(event);
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    case "PUT":
      if (!session) {
        return response
          .status(401)
          .json({ message: "You've must be logged in to edit an event." });
      }
      try {
        const event = await Event.findByIdAndUpdate(id, request.body);

        if (!event) {
          return response
            .status(404)
            .json({ message: "Event not found. Could not be updated." });
        }
        if (session.id != event.organizer.toString()) {
          return response
            .status(401)
            .json({ message: "You're not allowed to edit this event." });
        }
        return response
          .status(200)
          .json({ message: `Event with id ${event._id} updated.` });
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }

    case "DELETE":
      try {
        if (!session) {
          return response
            .status(401)
            .json({ message: "You must be logged in to access this route." });
        }

        const event = await Event.findById(id).populate("organizer");
        if (!event) {
          return response(404).json({ message: "Event not found" });
        }

        const user = await User.findById(session.id);
        if (!user) {
          return response.status(404).json({ message: "User not found" });
        }

        if (event.organizer.id.toString() !== session.id) {
          return response.status(403).json({ message: "Permission denied" });
        } else {
          const deleteEvent = await Event.findByIdAndDelete(id);
          return response
            .status(200)
            .json({ message: "Event successfully deleted." });
        }
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }

    default:
      return response.status(405).json({ message: "Method not allowed" });
  }
}
