// DOM Elements
const form = document.getElementById('findProfileForm');
const profileContainer = document.getElementById('profileContainer');
const userName = document.getElementById('userName');
const userRole = document.getElementById('userRole');
const userRsvp = document.getElementById('userRsvp');
const userDietary = document.getElementById('userDietary');
const taskList = document.getElementById('taskList');
const checklistItems = document.getElementById('checklistItems');

// Firebase setup (use <script> in HTML if not using Node imports)
const firebaseConfig = {
  apiKey: "AIzaSyDK7QoOBnf73q8V0H7vdZgeV9knY1GQhZw",
  authDomain: "mandi-b5b19.firebaseapp.com",
  projectId: "mandi-b5b19",
  storageBucket: "mandi-b5b19.appspot.com",
  messagingSenderId: "53505043322",
  appId: "1:53505043322:web:dede68f8aeca80c7de84c3",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch or create user profile
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();

  if (!firstName || !lastName) {
    alert('Please enter both your first and last name.');
    return;
  }

  try {
    const userRef = db.collection('guests').doc(`${firstName}_${lastName}`);
    const doc = await userRef.get();

    if (doc.exists) {
      const userData = doc.data();
      populateUserProfile(userData);
    } else {
      const defaultData = {
        firstName,
        lastName,
        role: "Guest",
        rsvpStatus: "Pending",
        dietaryRestrictions: "",
        tasks: [],
        checklist: [],
      };
      await userRef.set(defaultData);
      populateUserProfile(defaultData);
    }
  } catch (error) {
    console.error("Error fetching or creating user data:", error);
    alert("Something went wrong. Please try again later.");
  }
});

// Populate user profile
function populateUserProfile(data) {
  userName.textContent = `${data.firstName} ${data.lastName}`;
  userRole.textContent = data.role;
  userRsvp.textContent = data.rsvpStatus;
  userDietary.textContent = data.dietaryRestrictions;

  // Populate tasks
  taskList.innerHTML = "";
  data.tasks.forEach((task) => {
    const li = document.createElement('li');
    li.textContent = task;
    taskList.appendChild(li);
  });

  // Populate checklist
  checklistItems.innerHTML = "";
  data.checklist.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    checklistItems.appendChild(li);
  });

  profileContainer.style.display = "block";
}
