import dbConnect from "@/db/dbConnect.js";
import Event from "@/db/models/Events";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import User from "@/db/models/Users";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;



  switch (request.method) {
    case "GET":
      try {
        const event = await Event.findById(id).populate("organizer");
        if (!event) {
          return response.status(404).json({ message: "Event not found." });
        }
        return response.status(200).json(event);
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }
    case "PUT":
      try {
        const event = await Event.findByIdAndUpdate(id, request.body);
        if (!event) {
          return response
            .status(404)
            .json({ message: "Event not found. Could not be updated." });
        }
        return response
          .status(200)
          .json({ message: `Event with id ${event._id} updated.` });
      } catch (error) {
        return response.status(500).json({ message: error.message });
      }

    case "DELETE":
try {
      const event = await Event.findById(id).populate ("organizer");
if(!event) {
  return response(404).json({message: "Event not found"});
}

const user = await User.findById(session.id);
if(!user) {
  return response.status(404).json({message: "User not found"});
}

if (event.userId.toString() !== session.id) {
  return response.status(403).json({message: "Permission denied"});}

else {const deleteEvent = await Event.findByIdAndDelete(id);
    return response.status(204).send();}
 
} catch (error) {return response.status(500).json({ message: error.message });}
  
default:
    return response.status(405).json({message: "Method not allowed"});

  }

// case "DELETE":
//       try {
//         const eventResponse = await Event.findByIdAndDelete(id);
//         if (!eventResponse) {
//           response.status(404).json({ message: "No event found" });
//           return;
//         }
//         return response
//           .status(200)
//           .json({ message: "Event successfully deleted." });
//       } catch (error) {
//         return response.status(500).json({ message: error.message });
//       }