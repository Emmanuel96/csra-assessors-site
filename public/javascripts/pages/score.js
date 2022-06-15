let applicationID = window.location.pathname.split('/').pop()

// axios.get(`/api/application_score/${applicationID}`).then(score => {
//   document.getElementById('csr_benefit_score').value = score.data.csr_benefit_score

//   document.getElementById('env_benefit_score').value = score.data.environmental_benefit_score

//   document.getElementById('social_benefit_score').value = score.data.social_benefit_score

//   document.getElementById('staff_benefit_score').value = score.data.staff_benefit_score

//   document.getElementById('wrk_benefit_score').value = score.data.workplace_benefit_score

//   document.getElementById('charitable_benefit_score').value = score.data.charitable_benefit_score

//   document.getElementById('financial_benefit_score').value = score.data.financial_benefit_score

//   document.getElementById('commitment_score').value = score.data.commitment_score

//   document.getElementById('evidence_score').value = score.data.evidence_score

//   document.getElementById('degree_of_originality_score').value = score.data.degree_of_originality_score

//   document.getElementById('future_expansion_score').value = score.data.future_expansion_score

//   document.getElementById('replicability').value = score.data.replicability_score

//   document.getElementById('special_merit_score').value = score.data.special_merit_score

//   document.getElementById('comment').value = score.data.comment
// })

function submitScore() {
  console.log('clicked')
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
      comment: comment
    }

    axios.post(`/api/score/application/${applicationID}`, data).then(res => {
      console.log(res.data)
      Swal.fire({
        title: "Sucessfully Scored Application",
        confirmButtonColor: "#00a19a",
      });
    }).catch((error) => {
      console.log(error)
      Swal.fire({
        title: error.response.data.message,
        confirmButtonColor: "#00a19a",
      });
    })
  }
}