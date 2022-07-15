let applicationID = window.location.pathname.split('/').pop()

axios.get(`/api/application_score/${applicationID}`).then(score => {
  if(score){
    document.getElementById('date').innerHTML = score.data.date_assessed

    document.getElementById('csr_benefit_score').value = score.data.csr_benefit_score

    document.getElementById('env_benefit_score').value = score.data.environmental_benefit_score
  
    document.getElementById('social_benefit_score').value = score.data.social_benefit_score
  
    document.getElementById('staff_benefit_score').value = score.data.staff_benefit_score
  
    document.getElementById('wrk_benefit_score').value = score.data.workplace_benefit_score
  
    document.getElementById('charitable_benefit_score').value = score.data.charitable_benefit_score
  
    document.getElementById('financial_benefit_score').value = score.data.financial_benefit_score
  
    document.getElementById('commitment_score').value = score.data.commitment_score
  
    document.getElementById('evidence_score').value = score.data.evidence_score
  
    document.getElementById('degree_of_originality_score').value = score.data.degree_of_originality_score
  
    document.getElementById('future_expansion_score').value = score.data.future_expansion_score
  
    document.getElementById('replicability').value = score.data.replicability_score
  
    document.getElementById('special_merit_score').value = score.data.special_merit_score
  
    document.getElementById('total_score').innerHTML = score.data.total_score

    document.getElementById('comment').value = score.data.comment
  }
})

function submitScore() {
  let csr_benefit_score = document.getElementById('csr_benefit_score').value
  let env_benefit_score = document.getElementById('env_benefit_score').value
  let social_benefit_score = document.getElementById('social_benefit_score').value
  let staff_benefit_score = document.getElementById('staff_benefit_score').value
  let wrk_benefit_score = document.getElementById('wrk_benefit_score').value
  let charitable_benefit_score = document.getElementById('charitable_benefit_score').value
  let financial_benefit_score = document.getElementById('financial_benefit_score').value
  let commitment_score = document.getElementById('commitment_score').value
  let evidence_score = document.getElementById('evidence_score').value
  let degree_of_originality_score = document.getElementById('degree_of_originality_score').value
  let future_expansion_score = document.getElementById('future_expansion_score').value
  let replicability = document.getElementById('replicability').value
  let special_merit_score = document.getElementById('special_merit_score').value
  let comment = document.getElementById('comment').value

  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  let today  = new Date()
  let date_assessed = today.toLocaleDateString("en-US", options)

  let total_score = Number(csr_benefit_score) + Number(env_benefit_score) + Number(social_benefit_score) + Number(staff_benefit_score) + Number(wrk_benefit_score) + Number(charitable_benefit_score) + Number(financial_benefit_score) + Number(commitment_score) + Number(evidence_score) + Number(degree_of_originality_score) + Number(future_expansion_score) + Number(replicability) + Number(special_merit_score)

  if(!csr_benefit_score || !env_benefit_score || !social_benefit_score || !staff_benefit_score || !wrk_benefit_score || !charitable_benefit_score || !financial_benefit_score || !commitment_score || !evidence_score || !degree_of_originality_score || !future_expansion_score || !replicability || !special_merit_score){
    Swal.fire({
      title: "Please score all categories",
      confirmButtonColor: "#00a19a",
    });
  }else if (csr_benefit_score > 10 || env_benefit_score > 10 || social_benefit_score > 10 || staff_benefit_score > 10 || wrk_benefit_score > 10 || charitable_benefit_score > 10 || financial_benefit_score > 10 || commitment_score > 10 || evidence_score > 10 || degree_of_originality_score > 10 || future_expansion_score > 10 || replicability > 10 || special_merit_score > 10){
    Swal.fire({
      title: "Category score must be less than 10",
      confirmButtonColor: "#00a19a",
    });
  }else if(!comment){
    Swal.fire({
      title: "Please add a review comment",
      confirmButtonColor: "#00a19a",
    });
  }else{
    let data = {
      csr_benefit_score : csr_benefit_score,
      environmental_benefit_score: env_benefit_score,
      social_benefit_score: social_benefit_score,
      staff_benefit_score: staff_benefit_score,
      workplace_benefit_score: wrk_benefit_score,
      charitable_benefit_score: charitable_benefit_score,
      financial_benefit_score: financial_benefit_score,
      commitment_score: commitment_score,
      evidence_score: evidence_score,
      degree_of_originality_score: degree_of_originality_score,
      future_expansion_score: future_expansion_score,
      replicability_score: replicability,
      special_merit_score: special_merit_score,
      comment: comment,
      date_assessed: date_assessed,
      total_score: total_score.toString()
    }

    document.getElementById("submit_btn").innerText = "Submitting..."
    document.getElementById("submit_btn").disabled = true

    axios.post(`/api/score/application/${applicationID}`, data).then(() => {
      document.getElementById("submit_btn").innerText = "Submit"
      document.getElementById("submit_btn").disabled = false

      Swal.fire({
        title: "Sucessfully Scored Application",
        confirmButtonColor: "#00a19a",
      });
    }).catch((error) => {
      document.getElementById("submit_btn").innerText = "Submit"
      document.getElementById("submit_btn").disabled = false

      if(error.response.data.message === "You have already scored this application before"){
        Swal.fire({
          title: 'You have already scored this application before. Do you want to update score?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          confirmButtonColor: '#00a19a',
          denyButtonText: 'No',
          customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          }
        }).then((result) => {
          if (result.isConfirmed) {
            let data = {
              csr_benefit_score : csr_benefit_score,
              environmental_benefit_score: env_benefit_score,
              social_benefit_score: social_benefit_score,
              staff_benefit_score: staff_benefit_score,
              workplace_benefit_score: wrk_benefit_score,
              charitable_benefit_score: charitable_benefit_score,
              financial_benefit_score: financial_benefit_score,
              commitment_score: commitment_score,
              evidence_score: evidence_score,
              degree_of_originality_score: degree_of_originality_score,
              future_expansion_score: future_expansion_score,
              replicability_score: replicability,
              special_merit_score: special_merit_score,
              comment: comment,
              total_score: total_score.toString(),
              date_assessed: date_assessed
            }

            axios.put(`/api/update_score/application/${applicationID}`, data).then(() => {
              Swal.fire('Score was updated successfully', '', 'success')
            }).catch(() => {
              Swal.fire('Failed to update score', '', 'info')
            })
          } else if (result.isDenied) {
            Swal.fire('Got it! Score was not updated', '', 'info')
          }
        })
      }else if (error.response.data.message === "This application has been scored by 3 assesors already. Proceed to the next application"){
        Swal.fire({
          title: "This application has been scored by 3 assesors already. Proceed to the next application",
          confirmButtonColor: "#00a19a",
        });
      }
    })
  }
}