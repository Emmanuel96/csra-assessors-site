function login(){
  event.preventDefault()

  let email = document.getElementById('email').value 
  let password = document.getElementById('password').value

  var data = {email, password}

  fetch('/api/auth/login', {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json",
    }, 
    body: JSON.stringify(data)
  }).then(data => (
    data.json()
    )).then(res => {
    console.log("Welcome ", res.role)
  }).catch(error => {
    console.log("Wrong admin credentials")
  })
}