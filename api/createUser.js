import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../public/firebase.js";

const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, role } = JSON.parse(req.body);

    try {
      const docRef = doc(db, "guests", `${firstName}_${lastName}`);
      const defaultData = {
        firstName,
        lastName,
        role: role || "Guest",
        rsvpStatus: "Pending",
        dietaryRestrictions: "",
        hasPlusOne: false,
        tasks: [],
        checklist: [],
        isBachelor: false,
      };

      await setDoc(docRef, defaultData);
      res.status(201).json({ message: "Profile created successfully." });
    } catch (error) {
      console.error("Error creating user profile:", error);
      res.status(500).json({ error: "Error creating user profile." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
