// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC-zo0YksWy66r6vqLEsg3K--ARxe0JNME",
  authDomain: "avyron-441d4.firebaseapp.com",
  projectId: "avyron-441d4",
  storageBucket: "avyron-441d4.appspot.com",
  messagingSenderId: "354147160690",
  appId: "1:354147160690:web:8824937caa4f0a4769e8eb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function loginOrRegister() {
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;

  if (!phone || !password) {
    document.getElementById("message").innerText = "❌ Enter phone and password!";
    return;
  }

  // Treat phone as email
  const email = phone + "@avyron.com";

  // Try to login first
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("message").innerText = "🎉 Login Successful! Welcome " + phone;
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        // First time → register
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            document.getElementById("message").innerText = "✅ Account created! Welcome " + phone;
          })
          .catch((err) => {
            document.getElementById("message").innerText = "❌ Error: " + err.message;
          });
      } else if (error.code === "auth/wrong-password") {
        document.getElementById("message").innerText = "❌ Wrong password!";
      } else {
        document.getElementById("message").innerText = "❌ Error: " + error.message;
      }
    });
              }
