function registerAssessor(){
  event.preventDefault()

  let firstName = document.getElementById('fname').value 
  let lastName = document.getElementById('lname').value 
  let email = document.getElementById('email').value 
  let password = document.getElementById('password').value

  var data = {email, password, firstName, lastName}

  console.log(data)

  fetch('/api/auth/register/assessor', {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(data)
  })
}