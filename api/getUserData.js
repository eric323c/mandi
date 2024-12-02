import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../public/firebase.js";

const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName } = JSON.parse(req.body);

    try {
      const docRef = doc(db, "guests", `${firstName}_${lastName}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        res.status(200).json(docSnap.data());
      } else {
        res.status(404).json({ error: "Profile not found." });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Error fetching user data." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
