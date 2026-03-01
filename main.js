// Your Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "avyron-441d4.firebaseapp.com",
  projectId: "avyron-441d4",
  storageBucket: "avyron-441d4.firebasestorage.app",
  messagingSenderId: "354147160690",
  appId: "1:354147160690:web:8824937caa4f0a4769e8eb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Send Login Link
function sendLink() {
  var email = document.getElementById("email").value;

  var actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true
  };

  firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function() {
      window.localStorage.setItem('emailForSignIn', email);
      document.getElementById("message").innerText =
        "Login link sent! Check your email.";
    })
    .catch(function(error) {
      document.getElementById("message").innerText =
        error.message;
    });
}

// Auto login after clicking email link
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {

  var email = window.localStorage.getItem('emailForSignIn');

  firebase.auth().signInWithEmailLink(email, window.location.href)
    .then(function() {
      document.getElementById("message").innerText =
        "Login Successful!";
    })
    .catch(function(error) {
      document.getElementById("message").innerText =
        error.message;
    });
}
