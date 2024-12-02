import { getGuestByName, createGuest } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#profileForm");
  const rsvpSection = document.querySelector("#rsvpSection");
  const profileContainer = document.querySelector("#profileContainer");

  // Hide RSVP section until user logs in
  rsvpSection.style.display = "none";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();

    if (!firstName || !lastName) {
      alert("Please enter both your first and last name.");
      return;
    }

    let userData = await getGuestByName(firstName, lastName);
    if (!userData) {
      userData = await createGuest(firstName, lastName, "Friend");
      alert("New profile created. Please complete the RSVP.");
    }

    profileContainer.innerHTML = `
      <h2>Welcome, ${userData.firstName}!</h2>
      <p>Your Role: ${userData.role || "Not specified"}</p>
      <p>RSVP Status: ${userData.rsvpStatus || "Pending"}</p>
    `;
    rsvpSection.style.display = "block";
  });
});
