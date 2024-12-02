import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName } = req.body; // Get the name from the frontend

  try {
    // Query the "guests" collection to find matching user
    const q = query(
      collection(db, "guests"),
      where("firstName", "==", firstName),
      where("lastName", "==", lastName)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = querySnapshot.docs[0].data(); // Get first matching user
    return res.status(200).json({ user: userData }); // Return user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

