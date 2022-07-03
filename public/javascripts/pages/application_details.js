let applicationID = window.location.pathname.split('/').pop()
let applicationData = []

axios.get(`/api/applications/${applicationID}`).then(res => {
  applicationData = res.data
}).then(() => {
  document.getElementById('contact_person').value = applicationData.contact_person

  document.getElementById('postal_code').value = applicationData.postal_code

  document.getElementById('organisation_name').value = applicationData.organisation_name

  document.getElementById('email_address').value = applicationData.email_address

  document.getElementById('organisation_address').value = applicationData.organisation_address

  document.getElementById('mobile_number').value = applicationData.mobile_number

  document.getElementById('organisation_nationality').value = applicationData.organisation_nationality

  document.getElementById('telephone_number').value = applicationData.telephone_number

  document.getElementById('organisation_size').value = applicationData.organisation_size

  document.getElementById('organisation_turnover').value = applicationData.organisation_turnover

  document.getElementById('introduction').value = applicationData.introduction

  document.getElementById('env_energy').value = applicationData.env_energy

  document.getElementById('env_natural_resource').value = applicationData.env_natural_resource

  document.getElementById('env_travel').value = applicationData.env_travel

  document.getElementById('env_supply_chain_management').value = applicationData.env_supply_chain_management

  document.getElementById('env_waste').value = applicationData.env_waste

  document.getElementById('wrk_training').value = applicationData.wrk_training

  document.getElementById('wrk_labour_practices').value = applicationData.wrk_labour_practices

  document.getElementById('wrk_ethical_practices').value = applicationData.wrk_ethical_practices

  document.getElementById('wrk_governance').value = applicationData.wrk_governance

  document.getElementById('wrk_policies').value = applicationData.wrk_policies

  document.getElementById('wrk_training').value = applicationData.wrk_training

  document.getElementById('wrk_labour_practices').value = applicationData.wrk_labour_practices

  document.getElementById('wrk_ethical_practices').value = applicationData.wrk_ethical_practices

  document.getElementById('wrk_governance').value = applicationData.wrk_governance

  document.getElementById('wrk_policies').value = applicationData.wrk_policies

  document.getElementById('com_engagement').value = applicationData.com_engagement

  document.getElementById('com_local_issues').value = applicationData.com_local_issues

  document.getElementById('com_wealth_creation').value = applicationData.com_wealth_creation

  document.getElementById('com_projects_and_groups').value = applicationData.com_projects_and_groups

  document.getElementById('com_education').value = applicationData.com_education

  document.getElementById('phil_charitable_involvement').value = applicationData.phil_charitable_involvement

  document.getElementById('phil_volunteering').value = applicationData.phil_volunteering

  document.getElementById('phil_pro_bono').value = applicationData.phil_pro_bono

  document.getElementById('phil_fund_raising').value = applicationData.phil_fund_raising

  document.getElementById('phil_financial_and_kind_gifts').value = applicationData.phil_financial_and_kind_gifts
})

function handleScore() {
  window.open(`/score/${applicationID}`, '_blank')
}

function downloadFiles(){
  document.getElementById("dwnld_btn").innerText = "Please wait"
  document.getElementById("dwnld_btn").disabled = true

  fetch(`/api/media/download/${applicationID}`).then(res => {
    if(res.status === 400){
      document.getElementById("dwnld_btn").innerText = "Download attached files"
      document.getElementById("dwnld_btn").disabled = false

      return Swal.fire({
        title: "The application has no attached files",
        confirmButtonColor: "#00a19a",
      })
    }

    res.blob().then((data) => {
      document.getElementById("dwnld_btn").innerText = "Download attached files"
      document.getElementById("dwnld_btn").disabled = false

      let a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = "attached.zip";
      a.click();
    })
  })
}