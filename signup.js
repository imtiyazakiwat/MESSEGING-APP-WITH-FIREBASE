// // Firebase configuration
// var firebaseConfig = {
//     apiKey: "AIzaSyDrtN7J3Rv8AOWMzMnb-abeR6Tpfe86Dyo",
//     authDomain: "messaging-app-b080c.firebaseapp.com",
//     projectId: "messaging-app-b080c",
//     storageBucket: "messaging-app-b080c.appspot.com",
//     messagingSenderId: "100847611201",
//     appId: "1:100847611201:web:36db5b71b8c901606445c0",
//     measurementId: "G-KCWP1GQNJ6"
//     // Add more Firebase config properties as needed
//   };
  
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
  
  // Sign up form
  var signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    // Create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(userCredential) {
        // Sign up successful, redirect to chat room page
        window.location.href = "chatroom.html";
      })
      .catch(function(error) {
        // Handle sign up errors
        console.error(error);
      });
  });
  