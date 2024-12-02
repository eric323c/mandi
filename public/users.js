document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#findProfileForm");
  const profileContainer = document.querySelector("#profileContainer");

  // Listen for form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();
    
    if (!firstName || !lastName) {
      alert("Please enter both your first and last name.");
      return;
    }

    try {
      const docRef = db.collection("guests").doc(`${firstName}_${lastName}`);
      const docSnap = await docRef.get();

      if (docSnap.exists) {
        // User exists
        const userData = docSnap.data();
        displayUserProfile(userData);
      } else {
        // User does not exist, create new
        const newUser = {
          firstName,
          lastName,
          role: "Guest",
          rsvpStatus: "Pending",
          dietaryRestrictions: "",
          hasPlusOne: false,
          tasks: [],
          checklist: [],
          isBachelor: false,
        };
        await docRef.set(newUser);
        displayUserProfile(newUser);
      }
    } catch (error) {
      console.error("Error fetching or creating user data:", error);
    }
  });

  function displayUserProfile(userData) {
    profileContainer.innerHTML = `
      <h2>Welcome, ${userData.firstName} ${userData.lastName}!</h2>
      <p>Role: ${userData.role}</p>
      <p>RSVP Status: ${userData.rsvpStatus}</p>
      <p>Dietary Restrictions: ${userData.dietaryRestrictions}</p>
    `;
    profileContainer.style.display = "block";
  }
});
