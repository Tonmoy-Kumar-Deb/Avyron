
  // --- Firebase Config ---
const firebaseConfig = {
  apiKey: "AIzaSyC-zo0YksWy66r6vqLEsg3K--ARxe0JNME", // your real API key
  authDomain: "avyron-441d4.firebaseapp.com",
  projectId: "avyron-441d4",
  storageBucket: "avyron-441d4.appspot.com",
  messagingSenderId: "354147160690",
  appId: "1:354147160690:web:8824937caa4f0a4769e8eb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to send email login link
function sendLink() {
  const email = document.getElementById("email").value;
  if (!email) {
    document.getElementById("message").innerText = "Please enter your email!";
    return;
  }

  const actionCodeSettings = {
    url: window.location.href, // After clicking email link, user returns here
    handleCodeInApp: true
  };

  firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      // Save email to local storage for verification
      window.localStorage.setItem('emailForSignIn', email);
      document.getElementById("message").innerText = 
        "✅ Login link sent! Check your email.";
    })
    .catch((error) => {
      document.getElementById("message").innerText = 
        "❌ Error: " + error.message;
    });
}

// Check if coming from email link and sign in
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  let email = window.localStorage.getItem('emailForSignIn');

  if (!email) {
    email = window.prompt('Enter your email for confirmation:');
  }

  firebase.auth().signInWithEmailLink(email, window.location.href)
    .then((result) => {
      document.getElementById("message").innerText = 
        "🎉 Login Successful! Welcome " + result.user.email;
      // Clear saved email
      window.localStorage.removeItem('emailForSignIn');
    })
    .catch((error) => {
      document.getElementById("message").innerText = 
        "❌ Error: " + error.message;
    });
}
