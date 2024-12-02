import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firestore methods
export async function getGuestByName(firstName, lastName) {
  const docRef = doc(db, "guests", `${firstName}_${lastName}`);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function createGuest(firstName, lastName, role) {
  const docRef = doc(db, "guests", `${firstName}_${lastName}`);
  const defaultData = {
    firstName,
    lastName,
    role,
    rsvpStatus: "Pending",
    dietaryRestrictions: "",
    hasPlusOne: false,
    tasks: [],
    checklist: [],
    isBachelor: false,
  };
  await setDoc(docRef, defaultData);
  return defaultData;
}
