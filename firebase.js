import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID,
  measurementId: import.meta.env.FIREBASE_MEASUREMENT_ID,
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
