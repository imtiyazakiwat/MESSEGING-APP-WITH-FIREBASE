// // Firebase configuration (initialize if not already done)
// var firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     // Add more Firebase config properties as needed
//   };
  
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
  
  // Profile form
var profileForm = document.getElementById('profileForm');
var profilePictureInput = document.getElementById('profilePicture');
var usernameInput = document.getElementById('username');
var bioInput = document.getElementById('bio');

// Save profile details
profileForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Ensure a user is logged in
  var currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    return; // Exit if no user is logged in
  }
  
  var username = usernameInput.value;
  var bio = bioInput.value;
  
  // Update profile details
  currentUser.updateProfile({
    displayName: username
  }).then(function() {
    // Save additional details to Firebase
    firebase.database().ref('users/' + currentUser.uid).set({
      username: username,
      bio: bio
    }).then(function() {
      // Profile details saved successfully
      window.location.href = "chatroom.html";
    }).catch(function(error) {
      console.error(error);
    });
  }).catch(function(error) {
    console.error(error);
  });
});

// Profile picture upload
profilePictureInput.addEventListener('change', function(event) {
  var currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    return; // Exit if no user is logged in
  }
  
  var file = event.target.files[0];
  
  // Upload the file to Firebase Storage
  var storageRef = firebase.storage().ref('profilePictures/' + currentUser.uid + '/' + file.name);
  var uploadTask = storageRef.put(file);
  
  uploadTask.on('state_changed', function(snapshot) {
    // Track upload progress if needed
  }, function(error) {
    console.error(error);
  }, function() {
    // Get the download URL and save it to Firebase
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      currentUser.updateProfile({
        photoURL: downloadURL
      }).then(function() {
        // Profile picture uploaded successfully
      }).catch(function(error) {
        console.error(error);
      });
    });
  });
});