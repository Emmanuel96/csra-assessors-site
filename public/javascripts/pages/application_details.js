let applicationID = window.location.pathname.split('/').pop()
let applicationData = []

axios.get(`/api/applications/${applicationID}`).then(res => {
  applicationData = res.data
}).then(() => {
  document.getElementById('contact_person').innerText = applicationData.contact_person

  document.getElementById('postal_code').innerText = applicationData.postal_code

  document.getElementById('organisation_name').innerText = applicationData.organisation_name

  document.getElementById('email_address').innerText = applicationData.email_address

  document.getElementById('organisation_address').innerText = applicationData.organisation_address

  document.getElementById('industry_sector').innerText = applicationData.industry_sector

  document.getElementById('mobile_number').innerText = applicationData.mobile_number

  document.getElementById('organisation_nationality').innerText = applicationData.organisation_nationality

  document.getElementById('telephone_number').innerText = applicationData.telephone_number

  document.getElementById('organisation_size').innerText = applicationData.organisation_size

  document.getElementById('organisation_turnover').innerText = applicationData.organisation_turnover

  document.getElementById('introduction').innerText = applicationData.introduction

  document.getElementById('env_energy').innerText = applicationData.env_energy

  document.getElementById('env_natural_resource').innerText = applicationData.env_natural_resource

  document.getElementById('env_travel').innerText = applicationData.env_travel

  document.getElementById('env_supply_chain_management').innerText = applicationData.env_supply_chain_management

  document.getElementById('env_waste').innerText = applicationData.env_waste

  document.getElementById('wrk_training').innerText = applicationData.wrk_training

  document.getElementById('wrk_labour_practices').innerText = applicationData.wrk_labour_practices

  document.getElementById('wrk_ethical_practices').innerText = applicationData.wrk_ethical_practices

  document.getElementById('wrk_governance').innerText = applicationData.wrk_governance

  document.getElementById('wrk_policies').innerText = applicationData.wrk_policies

  document.getElementById('wrk_training').innerText = applicationData.wrk_training

  document.getElementById('wrk_labour_practices').innerText = applicationData.wrk_labour_practices

  document.getElementById('wrk_ethical_practices').innerText = applicationData.wrk_ethical_practices

  document.getElementById('wrk_governance').innerText = applicationData.wrk_governance

  document.getElementById('wrk_policies').innerText = applicationData.wrk_policies

  document.getElementById('com_engagement').innerText = applicationData.com_engagement

  document.getElementById('com_local_issues').innerText = applicationData.com_local_issues

  document.getElementById('com_wealth_creation').innerText = applicationData.com_wealth_creation

  document.getElementById('com_projects_and_groups').innerText = applicationData.com_projects_and_groups

  document.getElementById('com_education').innerText = applicationData.com_education

  document.getElementById('phil_charitable_involvement').innerText = applicationData.phil_charitable_involvement

  document.getElementById('phil_volunteering').innerText = applicationData.phil_volunteering

  document.getElementById('phil_pro_bono').innerText = applicationData.phil_pro_bono

  document.getElementById('phil_fund_raising').innerText = applicationData.phil_fund_raising

  document.getElementById('phil_financial_and_kind_gifts').innerText = applicationData.phil_financial_and_kind_gifts

  document.getElementById('phil_other_information').innerText = applicationData.phil_other_information

  document.getElementById('phil_future_planning').innerText = applicationData.phil_future_planning
})

function handleScore() {
  window.open(`/score/${applicationID}`, '_blank')
}

function printApplication(){
    printdivname = "application"

    var newstr = document.getElementById(printdivname).outerHTML;
    console.log(newstr)
    var oldstr = document.body.outerHTML;

    document.body.outerHTML = newstr;
    window.print();
    document.body.outerHTML = oldstr;

    return;
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