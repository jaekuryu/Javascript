
function checkLogin() {
  // get the user name and password
  var userName = document.getElementById("userName").value;
  var passWord = document.getElementById("passWord").value;

  // check if any of the textbox is empty
  if (!userName || !passWord) {
    alert("Please enter both User Name and Password.");
    return;
  }

  // check if the user name and password is stored in userdb.dat
  // you can use ajax or fetch to send a request to the server 
  // to check the credentials with the stored ones in userdb.dat
  fetch('/check-login', {
    method: 'POST',
    body: JSON.stringify({username: userName, password: passWord}),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    if(data.success){
      // redirect to index.html
      window.location.href = "/index.html";
    } else {
      // pop up a dialogbox saying "Log In Failed"
      alert("Log In Failed");
    }
  })
  .catch(err => {
    console.error('Error:', err);
  });

}

function saveToFile() {
  // get the user name and password
  var userName = document.getElementById("userName").value;
  var passWord = document.getElementById("passWord").value;

  // check if any of the textbox is empty
  if (!userName || !passWord) {
    alert("Please enter both User Name and Password.");
    return;
  }

  // Hash the password
  var hashedPassword = Sha256.hash(passWord);

  // send a request to the server to save the user name and hashed password to userdb.dat
  fetch('/save-user', {
    method: 'POST',
    body: JSON.stringify({username: userName, password: hashedPassword}),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    if(data.success){
      alert("User registered successfully");
    } else {
      alert("Failed to register user");
    }
  })
  .catch(err => {
    console.error('Error:', err);
  });
}


