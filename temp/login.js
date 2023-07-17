// login.js
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Login successful
      console.log('Login successful!');
      window.location.href = '/chatroom.html'; // Redirect to index.html
    })
    .catch((error) => {
      // Handle login errors
      console.log('Login error:', error.message);
    });
});
