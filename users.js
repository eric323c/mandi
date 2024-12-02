import { getGuestByName, createGuest } from "./firebase.js";

// DOM Elements
const form = document.querySelector("#findProfileForm");
const profileSection = document.querySelector("#profileSection");
const userDetails = document.querySelector("#userDetails");
const tasksSection = document.querySelector("#tasksSection");

// Hide profile until logged in
profileSection.style.display = "none";

// Event Listener for "Find My Profile"
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
      const isFamily = confirm("Are you family? Select OK for family, Cancel for friend.");
      const role = isFamily ? "Family" : "Friend";
      guest = await createGuest(firstName, lastName, role);
      alert("Profile created successfully!");
    }

    displayProfile(guest);
  } catch (error) {
    console.error("Error finding or creating profile:", error);
  }
});

function displayProfile(guest) {
  profileSection.style.display = "block";
  userDetails.innerHTML = `
    <p><strong>Name:</strong> ${guest.firstName} ${guest.lastName}</p>
    <p><strong>Role:</strong> ${guest.role}</p>
    <p><strong>RSVP Status:</strong> ${guest.rsvpStatus}</p>
    <p><strong>Dietary Restrictions:</strong> ${guest.dietaryRestrictions || "None"}</p>
  `;
  if (guest.isBachelor) {
    tasksSection.classList.remove("hidden");
    tasksSection.innerHTML = `
      <h3>Bachelor/Bachelorette Tasks:</h3>
      <ul>
        ${guest.tasks.map((task) => `<li>${task}</li>`).join("")}
      </ul>
    `;
  }
}
