function resetPassword(){
  event.preventDefault()

  let password = document.getElementById('password').value
  let confirmPassword = document.getElementById('confirm-password').value

  var data = {password}

  let token = window.location.href.split('/').pop()

  console.log(token)

  fetch(`/api/auth/reset_password/${token}`, {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(data)
  })
}