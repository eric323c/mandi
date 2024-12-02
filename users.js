// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase initialization
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch user data based on name input
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

// Function to populate the user profile dynamically
function populateUserProfile(userData) {
  const { firstName, role, rsvpStatus, tasks, notifications, specialRole, checklistProgress, dietaryRestriction } = userData;

  // Welcome message
  document.getElementById("welcome-message").innerText = `Welcome ${specialRole || role} ${firstName}!`;

  // RSVP details
  document.getElementById("rsvp-status").innerText = `RSVP Status: ${rsvpStatus || "Pending"}`;
  document.getElementById("dietary-restriction").innerText = dietaryRestriction
    ? `Dietary Restrictions: ${dietaryRestriction}`
    : "No dietary restrictions listed.";

  // Checklist/Tasks
  const checklistContainer = document.getElementById("checklist-container");
  checklistContainer.innerHTML = tasks
    .map(
      (task, index) =>
        `<div class="task ${checklistProgress[index] ? "completed" : ""}" data-index="${index}">
          <input type="checkbox" ${checklistProgress[index] ? "checked" : ""} />
          <label>${task}</label>
        </div>`
    )
    .join("");

  // Notifications
  const notificationsContainer = document.getElementById("notifications-container");
  notificationsContainer.innerHTML = notifications.length
    ? notifications
        .map((notification) => `<div class="notification">${notification}</div>`)
        .join("")
    : `<div class="notification">No new notifications.</div>`;
}

// Function to show an error message
function showError(message) {
  const errorContainer = document.getElementById("error-container");
  errorContainer.innerText = message;
  errorContainer.style.display = "block";
}

// Event Listener for marking tasks as completed
document.getElementById("checklist-container").addEventListener("change", async (e) => {
  if (e.target.tagName === "INPUT") {
    const taskIndex = e.target.closest(".task").dataset.index;
    const name = prompt("Please re-enter your name for verification:");
    const [firstName, lastName] = name.split(" ");
    const docRef = doc(db, "guests", `${firstName}_${lastName}`);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const checklistProgress = docSnap.data().checklistProgress || [];
      checklistProgress[taskIndex] = e.target.checked;
      await updateDoc(docRef, { checklistProgress });
    }
  }
});

// Fetch user data on page load
document.getElementById("name-submit").addEventListener("click", () => {
  const nameInput = document.getElementById("name-input").value;
  if (nameInput) fetchUserData(nameInput);
});
