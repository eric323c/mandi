// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDK7QoOBnf73q8V0H7vdZgeV9knY1GQhZw",
    authDomain: "mandi-b5b19.firebaseapp.com",
    projectId: "mandi-b5b19",
    storageBucket: "mandi-b5b19.appspot.com",
    messagingSenderId: "53505043322",
    appId: "1:53505043322:web:dede68f8aeca80c7de84c3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Select elements
const form = document.getElementById("userForm");
const profileContainer = document.getElementById("profileContainer");
const profileDetails = document.getElementById("profileDetails");

// Fetch or create user profile
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();

    if (!firstName || !lastName) {
        alert("Please enter both your first and last name.");
        return;
    }

    try {
        // Try fetching user
        const docRef = db.collection("guests").doc(`${firstName}_${lastName}`);
        const doc = await docRef.get();

        if (doc.exists) {
            // User exists - show profile
            displayProfile(doc.data());
        } else {
            // User does not exist - create new profile
            const defaultData = {
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
            await docRef.set(defaultData);
            displayProfile(defaultData);
        }
    } catch (error) {
        console.error("Error fetching or creating user data:", error);
    }
});

// Display profile
function displayProfile(data) {
    profileDetails.innerHTML = `
        <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
        <li><strong>Role:</strong> ${data.role}</li>
        <li><strong>RSVP Status:</strong> ${data.rsvpStatus}</li>
        <li><strong>Dietary Restrictions:</strong> ${data.dietaryRestrictions}</li>
    `;
    profileContainer.style.display = "block";
}
