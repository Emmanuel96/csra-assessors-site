let applications = []

axios.get('/api/assessed_applications').then(res => {
  applications = res.data

  let companies = applications.map(application => (
    `<div class="rounded-md shadow-md p-5 text-center">
      <h1 class="font-semibold text-[#585856] text-xl">${application.organisation_name}</h1>

      <p class="mt-2 text-[#585856]">${application.email_address}</p>

      <button class="text-sm rounded-md border-2 text-white bg-[#00A19A] py-1 mt-3 px-3 hover:bg-[#068882] hover:shadow-md">
        <a href="/application_score_details/${application._id}">
          View scores
        </a>  
      </button>
    </div>`
  ))

  document.getElementById('container').innerHTML = companies
})