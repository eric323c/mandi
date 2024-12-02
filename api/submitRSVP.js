import { db } from "../firebase";
import { doc, updateDoc, Timestamp } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, rsvpStatus, message, hasPlusOne } = req.body; // RSVP data from frontend

  try {
    // Find the document by name (simplified)
    const docRef = doc(db, "guests", `${firstName}_${lastName}`);
    await updateDoc(docRef, {
      rsvpStatus,
      message,
      hasPlusOne,
      rsvpDate: Timestamp.now(),
    });

    return res.status(200).json({ success: true, message: "RSVP saved successfully!" });
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
