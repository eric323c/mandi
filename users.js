document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.querySelector("#userForm");
  const rsvpForm = document.querySelector("#rsvpForm");

  // Fetch user data when they enter their name
  userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;

    try {
      const response = await fetch("/api/getUserData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });

      const data = await response.json();
      if (data.user) {
        displayUserData(data.user); // Show dynamic content
      } else {
        alert("User not found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  });

  // Submit RSVP data
  rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      rsvpStatus: document.querySelector("#rsvpStatus").value,
      message: document.querySelector("#message").value,
      hasPlusOne: document.querySelector("#hasPlusOne").checked,
    };

    try {
      const response = await fetch("/api/submitRSVP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert("RSVP submitted successfully!");
      } else {
        alert("Error submitting RSVP.");
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    }
  });
});

// Helper function to display user data
function displayUserData(user) {
  const userDetails = document.querySelector("#userDetails");
  userDetails.innerHTML = `
    <h3>Welcome, ${user.firstName} ${user.lastName}!</h3>
    <p>Role: ${user.role}</p>
    <p>Tasks: ${user.tasks.join(", ")}</p>
    <p>RSVP Status: ${user.rsvpStatus}</p>
  `;
}
