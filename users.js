document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#guestForm");
  const profileContainer = document.querySelector("#profileContainer");
  const rsvpSection = document.querySelector("#rsvpSection");
  const rsvpForm = document.querySelector("#rsvpForm");

  // Hide RSVP section until user is logged in
  rsvpSection.style.display = "none";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();

    if (!firstName || !lastName) {
      alert("Please enter both your first and last name.");
      return;
    }

    profileContainer.innerHTML = "<p>Loading...</p>";

    try {
      const response = await fetch(`/api/getUserData?firstName=${firstName}&lastName=${lastName}`);
      if (!response.ok) {
        throw new Error("Guest not found. Please fill out your details to create an account.");
      }

      const data = await response.json();
      renderProfile(data);

      // Show RSVP section after user profile is loaded
      rsvpSection.style.display = "block";
    } catch (error) {
      console.warn("Error fetching profile:", error.message);
      profileContainer.innerHTML = `
        <p>${error.message}</p>
        <form id="createProfileForm">
          <label for="role">Are you Family or Friend?</label>
          <select id="role" required>
            <option value="Family">Family</option>
            <option value="Friend">Friend</option>
          </select>
          <button type="button" id="createProfileBtn">Create Profile</button>
        </form>
      `;

      const createProfileBtn = document.querySelector("#createProfileBtn");
      createProfileBtn.addEventListener("click", async () => {
        const role = document.querySelector("#role").value;
        try {
          await createProfile(firstName, lastName, role);
          alert("Profile created! Refresh and log in again.");
        } catch (err) {
          console.error("Error creating profile:", err);
          alert("Failed to create profile. Try again.");
        }
      });
    }
  });

  async function createProfile(firstName, lastName, role) {
    const response = await fetch(`/api/createUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        role,
        rsvpStatus: "Pending",
        tasks: [],
        hasPlusOne: false,
        message: "",
      }),
    });

    if (!response.ok) {
      throw new Error("Error creating profile.");
    }
  }

  function renderProfile(data) {
    profileContainer.innerHTML = `
      <div class="profile-card">
        <h2>Welcome ${data.role} ${data.firstName}!</h2>
        <p><strong>RSVP Status:</strong> ${data.rsvpStatus}</p>
        <p><strong>Tasks:</strong> ${data.tasks.length ? data.tasks.join(", ") : "No tasks assigned"}</p>
      </div>
    `;
  }

  rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const rsvpStatus = document.querySelector("#rsvpStatus").value;
    const hasPlusOne = document.querySelector("#hasPlusOne").checked;
    const message = document.querySelector("#message").value;

    try {
      const response = await fetch(`/api/updateRSVP`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rsvpStatus, hasPlusOne, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit RSVP.");
      }

      alert("RSVP submitted successfully!");
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      alert("Error submitting RSVP. Try again.");
    }
  });
});
