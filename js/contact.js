// Import the necessary functions from the Firebase SDKs
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD293OmXnh32SslMpxgx6nOP1r8Yiqz1pw",
    authDomain: "ftls-41ff7.firebaseapp.com",
    projectId: "ftls-41ff7",
    storageBucket: "ftls-41ff7.appspot.com",
    messagingSenderId: "990556714870",
    appId: "1:990556714870:web:ac8219e1ed1025b4106c57",
    measurementId: "G-G2L38CRKM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Event listener for form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        submitMessage();
    });

    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        subscribeToNewsletter();
    });
});

// Function to submit the contact message to Firestore
function submitMessage() {
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    addDoc(collection(db, "messages"), {
        email: email,
        message: message,
        timestamp: serverTimestamp()
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert('Your message has been sent successfully!');
        document.getElementById('email').value = ''; // Clear the email field
        document.getElementById('message').value = ''; // Clear the message field
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert('Error sending message. Please try again later.');
    });
}

// Function to handle newsletter subscription
function subscribeToNewsletter() {
    const newsletterEmail = document.getElementById('newsletterEmail').value;

    addDoc(collection(db, "newsletterSubscriptions"), {
        email: newsletterEmail,
        timestamp: serverTimestamp()
    })
    .then(() => {
        console.log("Newsletter subscription added!");
        alert("Thank you for subscribing!");
        document.getElementById('newsletterEmail').value = ''; // Clear the email field
    })
    .catch((error) => {
        console.error("Error subscribing to newsletter: ", error);
        alert("Error subscribing to the newsletter. Please try again later.");
    });
}
