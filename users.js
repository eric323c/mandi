import { db, getGuestByName, createGuest } from "./firebase.js";

// DOM elements
const form = document.querySelector("#findProfileForm");
const rsvpSection = document.querySelector("#rsvpSection");
const profileSection = document.querySelector("#profileSection");
const userName = document.querySelector("#userName");
const userRole = document.querySelector("#userRole");
const userRsvpStatus = document.querySelector("#userRsvpStatus");
const userDiet = document.querySelector("#userDiet");
const userTasks = document.querySelector("#userTasks");
const userChecklist = document.querySelector("#userChecklist");

// Hide RSVP until logged in
rsvpSection.style.display = "none";
profileSection.style.display = "none";

// Handle "Find My Profile" button click
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.querySelector("#firstName").value.trim();
  const lastName = document.querySelector("#lastName").value.trim();

  if (!firstName || !lastName) {
    alert("Please enter both your first and last name.");
    return;
  }

  try {
    let guest = await getGuestByName(firstName, lastName);

    if (!guest) {
      const isFamily = confirm("Are you a family member?");
      const role = isFamily ? "Family" : "Friend";
      guest = await createGuest(firstName, lastName, role);
      alert("Profile created! Please review your dashboard.");
    }

    displayProfile(guest);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
});

function displayProfile(guest) {
  profileSection.style.display = "block";
  rsvpSection.style.display = "block";

  userName.textContent = `${guest.firstName} ${guest.lastName}`;
  userRole.textContent = guest.role;
  userRsvpStatus.textContent = guest.rsvpStatus || "Pending";
  userDiet.textContent = guest.dietaryRestrictions || "None";

  userTasks.innerHTML = "";
  guest.tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task;
    userTasks.appendChild(li);
  });

  userChecklist.innerHTML = "";
  guest.checklist.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    userChecklist.appendChild(li);
  });

  if (guest.isBachelor) {
    document.querySelector("#bachelorTasks").style.display = "block";
  }
}
