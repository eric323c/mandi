// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK7QoOBnf73q8V0H7vdZgeV9knY1GQhZw",
  authDomain: "mandi-b5b19.firebaseapp.com",
  projectId: "mandi-b5b19",
  storageBucket: "mandi-b5b19.appspot.com",
  messagingSenderId: "53505043322",
  appId: "1:53505043322:web:dede68f8aeca80c7de84c3",
  measurementId: "G-T58TB5HC3L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
