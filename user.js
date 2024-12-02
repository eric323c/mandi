import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

import { firebaseConfig } from "./firebase.js"; // Import Firebase config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch user data from Firestore
async function fetchUserData(name) {
  const [firstName, lastName] = name.split(" ");
  const docRef = doc(db, "guests", `${firstName}_${lastName}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    populateUserProfile(userData);
  } else {
    showError("No user found with the provided name!");
  }
}

// Function to populate user data
function populateUserProfile(userData) {
  const { firstName, role, rsvpStatus, tasks, notifications, dietaryRestriction } = userData;

  document.getElementById("welcome-message").innerText = `Welcome ${role || "Guest"} ${firstName}!`;

  document.getElementById("rsvp-status").innerText = `RSVP Status: ${rsvpStatus || "Pending"}`;
  document.getElementById("dietary-restriction").innerText = dietaryRestriction
    ? `Dietary Restrictions: ${dietaryRestriction}`
    : "No dietary restrictions listed.";

  const checklistContainer = document.getElementById("checklist-container");
  checklistContainer.innerHTML = tasks
    ? tasks.map(task => `<div class="task">${task}</div>`).join("")
    : "No tasks available.";

  const notificationsContainer = document.getElementById("notifications-container");
  notificationsContainer.innerHTML = notifications.length
    ? notifications.map(n => `<div class="notification">${n}</div>`).join("")
    : "No notifications.";
}

// Error handling
function showError(message) {
  const errorContainer = document.getElementById("error-container");
  errorContainer.textContent = message;
  errorContainer.style.display = "block";
}

// Event listener for name submission
document.getElementById("name-submit").addEventListener("click", () => {
  const name = document.getElementById("name-input").value.trim();
  if (name) {
    fetchUserData(name);
  } else {
    showError("Please enter a valid name.");
  }
});
