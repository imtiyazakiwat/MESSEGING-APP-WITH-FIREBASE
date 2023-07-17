// // Firebase configuration (initialize if not already done)
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
  
  // Chat room messages
var chatMessages = document.getElementById('chatMessages');
var messageForm = document.getElementById('messageForm');
var messageInput = document.getElementById('messageInput');
var profilePicture = document.getElementById('profilePicture');
var username = document.getElementById('username');

// Listen for new messages
firebase.database().ref('messages').on('child_added', function(snapshot) {
  var message = snapshot.val();
  var messageElement = document.createElement('p');
  messageElement.innerText = message.sender + ': ' + message.text;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Send message
messageForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  var currentUser = firebase.auth().currentUser;
  
  var messageText = messageInput.value;
  
  if (messageText.trim() !== '') {
    var newMessageRef = firebase.database().ref('messages').push();
    newMessageRef.set({
      sender: currentUser.displayName,
      text: messageText
    });
    
    messageInput.value = '';
  }
});

// Display user profile details
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    profilePicture.src = user.photoURL;
    username.innerText = user.displayName;
  }
});






