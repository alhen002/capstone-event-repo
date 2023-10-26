import dbConnect from "@/db/dbConnect";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import User from "@/db/models/Users";

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
      const user = await User.findById(session.id);
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }
      return response.status(200).json(user);
    default:
      return response.status(405).json({ message: "Method not allowed" });
  }

  // if (request.method === "POST") {
  //   const { eventId } = request.body;
  //   const user = await User.findOne({ email: session.user.email });

  //   // const user = await User.findById(userId).populate('attending');

  //   user.bookmarkedEvents.push(eventId);
  //   await user.save();
  //   response.status(200).json({ message: "Event bookmarked" });
  // }
}
