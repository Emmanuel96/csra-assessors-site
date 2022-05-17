function registerAssessor(){
  event.preventDefault()

  let firstName = document.getElementById('firstName').value 
  let lastName = document.getElementById('lastName').value 
  let email = document.getElementById('email').value 
  let password = document.getElementById('password').value
  let confirm_password = document.getElementById('confirm_password').value

  if(!firstName || !lastName || !email || !password || !confirm_password){
    Swal.fire({
      title: "Please complete all input fields",
      confirmButtonColor: "#00a19a",
    })
  }else if(!/\S+@\S+\.\S+/.test(email)){
    Swal.fire({
      title: "Please enter a valid email",
      confirmButtonColor: "#00a19a",
    })
  }else if (password !== confirm_password){
    Swal.fire({
      title: "Passwords do not match",
      confirmButtonColor: "#00a19a",
    })
  }else if (password.length < 6){
    Swal.fire({
      title: "Password must be 6 characters or more",
      confirmButtonColor: "#00a19a",
    })
  }else{
    document.getElementById('reg_btn').innerText = "Registering..."
    document.getElementById('reg_btn').disabled = true

    var data = {email, password, firstName, lastName}

    console.log(data)
  
    fetch('/api/auth/register/assessor', {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data)
    }).then(data => (
      data.json()
    )).then(res => {
      if (!res.success){
        document.getElementById('reg_btn').innerText = "REGISTER"

        document.getElementById('reg_btn').disabled = false

        document.getElementById('email').value = '' 

        Swal.fire({
          title: "There is an admin/assessor registered with this email already",
          confirmButtonColor: "#00a19a",
        })
      }else if (res.success){
        document.getElementById('reg_btn').innerText = "REGISTER"

        document.getElementById('reg_btn').disabled = false

        document.getElementById('firstName').value = '' 

        document.getElementById('lastName').value = '' 

        document.getElementById('email').value = '' 

        document.getElementById('password').value = ''

        document.getElementById('confirm_password').value = ''

        Swal.fire({
          title: "Successfully registered assessor",
          confirmButtonColor: "#00a19a",
        })
      }
    }).catch(() => {
      Swal.fire({
        title: "Snap!",
        text: "Something went wrong",
        confirmButtonColor: "#00a19a",
      })
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

function toggleShowConfirmPassword() {
  var x = document.getElementById("confirm_password");
  if (x.type === "password") {
    x.type = "text";
  } else{
    x.type = "password";
  }
}