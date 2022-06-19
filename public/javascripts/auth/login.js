function login(){
  event.preventDefault()

  let email = document.getElementById('email').value
  let password = document.getElementById('password').value

  if (!email || !password) {
    Swal.fire({
      title: "Please enter email and password",
      confirmButtonColor: "#00a19a",
    })
  }else if (!/\S+@\S+\.\S+/.test(email)){
    Swal.fire({
      title: "Please enter a valid email",
      confirmButtonColor: "#00a19a",
    })
  }else{
    document.getElementById('login_btn').innerText = "Logging in..."
    document.getElementById('login_btn').disabled = true

    var data = { email, password }

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
      if(res){
        document.getElementById('login_btn').innerText = `Welcome ${res.role}`

        if(res.role === 'admin'){
          setTimeout(() => {
            window.location.href = 'assessed_applications'
          }, 500)
        }else if(res.role === 'assessor'){
          setTimeout(() => {
            window.location.href = 'applications'
          }, 500)
        }
      }
    }).catch(() => {
      Swal.fire({
        title: "Email or Password is incorrect",
        confirmButtonColor: "#00a19a",
      })

      document.getElementById('login_btn').innerText = "Login"
      document.getElementById('login_btn').disabled = false
    })
  }
}

function toggleShowPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else{
    x.type = "password";
  }
}