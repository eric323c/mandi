document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("findProfileForm");
  const profile = document.getElementById("profile");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    try {
      const res = await fetch("/api/getUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (res.ok) {
        const user = await res.json();
        document.getElementById("profileName").textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById("profileRole").textContent = user.role;
        profile.style.display = "block";
      } else {
        alert("User not found. Please create your profile.");
        // Handle profile creation...
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  });
});
