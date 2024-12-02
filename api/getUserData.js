import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  try {
    const { firstName, lastName } = req.query;

    if (!firstName || !lastName) {
      return res.status(400).json({ error: "Missing firstName or lastName" });
    }

    const guestsRef = collection(db, "guests");
    const q = query(guestsRef, where("firstName", "==", firstName), where("lastName", "==", lastName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ error: "Guest not found" });
    }

    const guestData = querySnapshot.docs.map((doc) => doc.data())[0];

    return res.status(200).json(guestData);
  } catch (error) {
    console.error("Error fetching guest data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
