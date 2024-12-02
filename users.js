document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#guestForm");
  const profileContainer = document.querySelector("#profileContainer");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();

    profileContainer.innerHTML = "<p>Loading...</p>";

    try {
      const response = await fetch(`/api/getUserData?firstName=${firstName}&lastName=${lastName}`);
      if (!response.ok) {
        throw new Error("Guest not found");
      }

      const data = await response.json();
      renderProfile(data);
    } catch (error) {
      console.error(error);
      profileContainer.innerHTML = `<div class="alert">Error: ${error.message}</div>`;
    }
  });

  function renderProfile(data) {
    profileContainer.innerHTML = `
      <div class="profile-card">
        <h2>Welcome ${data.role === "Bachelor" ? "Bachelor" : "Guest"} ${data.firstName}!</h2>
        <p><strong>RSVP Status:</strong> ${data.rsvpStatus}</p>
        <p><strong>Message for Couple:</strong> ${data.message || "No message provided"}</p>
        <p><strong>Tasks:</strong> ${data.tasks.length > 0 ? data.tasks.join(", ") : "No tasks assigned"}</p>
      </div>
    `;
  }
});
