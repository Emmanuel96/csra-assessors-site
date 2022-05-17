function forgotPassword(){
  event.preventDefault()

  let email = document.getElementById('email').value 

  var data = {email}

  fetch('/api/auth/forgot_password', {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json",
    }, 
    body: JSON.stringify(data)
  }).then(() => {
    console.log("Sent! check your email")
  }).catch(error => {
    console.log("Something went wrong")
  })
}