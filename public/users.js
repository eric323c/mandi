// Select DOM elements
const form = document.querySelector("#profile-form");
const profileContainer = document.querySelector("#profile-container");
const userName = document.querySelector("#user-name");
const userRole = document.querySelector("#user-role");
const userRsvp = document.querySelector("#user-rsvp");
const userDiet = document.querySelector("#user-diet");
const userChecklist = document.querySelector("#user-checklist");

// Event Listener for form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = document.querySelector("#firstName").value.trim();
  const lastName = document.querySelector("#lastName").value.trim();

  if (!firstName || !lastName) {
    alert("Please enter both first and last names.");
    return;
  }

  try {
    const userDoc = await firebase
      .firestore()
      .collection("guests")
      .doc(`${firstName}_${lastName}`)
      .get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      renderUserProfile(userData);
    } else {
      alert("Profile not found. Please RSVP first!");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

// Render User Profile
function renderUserProfile(userData) {
  userName.textContent = `${userData.firstName} ${userData.lastName}`;
  userRole.textContent = userData.role || "N/A";
  userRsvp.textContent = userData.rsvpStatus || "Pending";
  userDiet.textContent = userData.dietaryRestrictions || "None";

  userChecklist.innerHTML = "";
  (userData.checklist || []).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    userChecklist.appendChild(li);
  });

  profileContainer.style.display = "block";
}
