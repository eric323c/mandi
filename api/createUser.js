import { getFirestore, collection, addDoc } from "firebase/firestore";
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
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      firstName,
      lastName,
      role = "Friend", // Default to "Friend" if role is not provided
      rsvpStatus = "Pending", // Default RSVP status
      tasks = [], // Default empty task array
      hasPlusOne = false, // Default to no plus one
      message = "", // Default empty message
      isBachelor = false, // Default not a bachelor
      checklistProgress = 0, // Default 0% progress
      notifications = false, // Default notifications off
      dietaryRestriction = "", // Default no dietary restrictions
      totalGuests = 1, // Default 1 (the guest themselves)
    } = req.body;

    // Add the document to Firestore
    await addDoc(collection(db, "guests"), {
      firstName,
      lastName,
      role,
      rsvpStatus,
      tasks,
      hasPlusOne,
      message,
      isBachelor,
      checklistProgress,
      notifications,
      dietaryRestriction,
      totalGuests,
    });

    res.status(200).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
