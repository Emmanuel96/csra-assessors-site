let applications = []

axios.get('/api/applications').then(res => {
  applications = res.data

  let company = applications.map(application => (
    `<button class="shadow-md hover:shadow-md rounded-lg">
      <a href="/applications/${application._id}" target="_blank">
        <div class="p-5">
          <h1 class="text-xl text-[#272929] font-semibold break-words">${application.organisation_name}</h1>
          <p class="text-[#1b6864] break-words mt-2">${application.email_address}</p>
        </div>
      </a>  
    </button>`
  ))

  document.getElementById('container').innerHTML = company
})