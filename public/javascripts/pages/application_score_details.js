let applicationID = window.location.pathname.split('/').pop()

axios.get(`/api/applications/${applicationID}`).then(res => {
  document.getElementById('organisation_name').innerHTML = res.data.organisation_name  
})

axios.get(`/api/all_application_scores/${applicationID}`).then((res) => {
  let scores = res.data

  document.getElementById('csr_benefit_score_1').innerHTML = scores[0].csr_benefit_score

  document.getElementById('environmental_benefit_score_1').innerHTML = scores[0].environmental_benefit_score

  document.getElementById('social_benefit_score_1').innerHTML = scores[0].social_benefit_score

  document.getElementById('staff_benefit_score_1').innerHTML = scores[0].staff_benefit_score

  document.getElementById('workplace_benefit_score_1').innerHTML = scores[0].workplace_benefit_score

  document.getElementById('charitable_benefit_score_1').innerHTML = scores[0].charitable_benefit_score

  document.getElementById('financial_benefit_score_1').innerHTML = scores[0].financial_benefit_score

  document.getElementById('commitment_score_1').innerHTML = scores[0].commitment_score

  document.getElementById('evidence_score_1').innerHTML = scores[0].evidence_score

  document.getElementById('degree_of_originality_score_1').innerHTML = scores[0].degree_of_originality_score

  document.getElementById('future_expansion_score_1').innerHTML = scores[0].future_expansion_score

  document.getElementById('replicability_score_1').innerHTML = scores[0].replicability_score

  document.getElementById('special_merit_score_1').innerHTML = scores[0].special_merit_score

  document.getElementById('total_score_1').innerHTML = scores[0].total_score

  document.getElementById('date_assessed_1').innerHTML = scores[0].date_assessed

  document.getElementById('comment_1').value = scores[0].comment

  document.getElementById('csr_benefit_score_2').innerHTML = scores[1].csr_benefit_score

  document.getElementById('environmental_benefit_score_2').innerHTML = scores[1].environmental_benefit_score

  document.getElementById('social_benefit_score_2').innerHTML = scores[1].social_benefit_score

  document.getElementById('staff_benefit_score_2').innerHTML = scores[1].staff_benefit_score

  document.getElementById('workplace_benefit_score_2').innerHTML = scores[1].workplace_benefit_score

  document.getElementById('charitable_benefit_score_2').innerHTML = scores[1].charitable_benefit_score

  document.getElementById('financial_benefit_score_2').innerHTML = scores[1].financial_benefit_score

  document.getElementById('commitment_score_2').innerHTML = scores[1].commitment_score

  document.getElementById('evidence_score_2').innerHTML = scores[1].evidence_score

  document.getElementById('degree_of_originality_score_2').innerHTML = scores[1].degree_of_originality_score

  document.getElementById('future_expansion_score_2').innerHTML = scores[1].future_expansion_score

  document.getElementById('replicability_score_2').innerHTML = scores[1].replicability_score

  document.getElementById('special_merit_score_2').innerHTML = scores[1].special_merit_score

  document.getElementById('total_score_2').innerHTML = scores[1].total_score

  document.getElementById('date_assessed_2').innerHTML = scores[1].date_assessed

  document.getElementById('comment_2').value = scores[1].comment

  document.getElementById('csr_benefit_score_3').innerHTML = scores[2].csr_benefit_score

  document.getElementById('environmental_benefit_score_3').innerHTML = scores[2].environmental_benefit_score

  document.getElementById('social_benefit_score_3').innerHTML = scores[2].social_benefit_score

  document.getElementById('staff_benefit_score_3').innerHTML = scores[2].staff_benefit_score

  document.getElementById('workplace_benefit_score_3').innerHTML = scores[2].workplace_benefit_score

  document.getElementById('charitable_benefit_score_3').innerHTML = scores[2].charitable_benefit_score

  document.getElementById('financial_benefit_score_3').innerHTML = scores[2].financial_benefit_score

  document.getElementById('commitment_score_3').innerHTML = scores[2].commitment_score

  document.getElementById('evidence_score_3').innerHTML = scores[2].evidence_score

  document.getElementById('degree_of_originality_score_3').innerHTML = scores[2].degree_of_originality_score

  document.getElementById('future_expansion_score_3').innerHTML = scores[2].future_expansion_score

  document.getElementById('replicability_score_3').innerHTML = scores[2].replicability_score

  document.getElementById('special_merit_score_3').innerHTML = scores[2].special_merit_score

  document.getElementById('total_score_3').innerHTML = scores[2].total_score

  document.getElementById('date_assessed_3').innerHTML = scores[2].date_assessed

  document.getElementById('comment_3').value = scores[2].comment

  // let average_1 = (scores[0].total_score / 13)

  // let average_2 = (scores[1].total_score / 13)

  // let average_3 = (scores[2].total_score / 13)

  let average_1 = (scores[0].total_score / (120*3) * 100)

  let average_2 = (scores[1].total_score / (120*3) * 100)

  let average_3 = (scores[2].total_score / (120*3) * 100)

  document.getElementById('average_1').innerHTML = average_1.toFixed(2)

  document.getElementById('average_2').innerHTML = average_2.toFixed(2)

  document.getElementById('average_3').innerHTML = average_3.toFixed(2)    

  if(scores[0].total_score < 65){
    document.getElementById('award_1').innerHTML = "No Award"
  } else if(scores[0].total_score >= 65 && scores[0].total_score <= 83){
    document.getElementById('award_1').innerHTML = "Bronze"
  } else if(scores[0].total_score >= 84 && scores[0].total_score <= 103){
    document.getElementById('award_1').innerHTML = "Silver"
  } else if(scores[0].total_score >= 104 && scores[0].total_score <= 130){
    document.getElementById('award_1').innerHTML = "Gold"
  }

  if(scores[1].total_score < 65){
    document.getElementById('award_2').innerHTML = "No Award"
  } else if(scores[1].total_score >= 65 && scores[1].total_score <= 83){
    document.getElementById('award_2').innerHTML = "Bronze"
  } else if(scores[1].total_score >= 84 && scores[1].total_score <= 103){
    document.getElementById('award_2').innerHTML = "Silver"
  } else if(scores[1].total_score >= 104 && scores[1].total_score <= 130){
    document.getElementById('award_2').innerHTML = "Gold"
  }

  if(scores[2].total_score < 65){
    document.getElementById('award_3').innerHTML = "No Award"
  } else if(scores[2].total_score >= 65 && scores[2].total_score <= 83){
    document.getElementById('award_3').innerHTML = "Bronze"
  } else if(scores[2].total_score >= 84 && scores[2].total_score <= 103){
    document.getElementById('award_3').innerHTML = "Silver"
  } else if(scores[2].total_score >= 104 && scores[2].total_score <= 130){
    document.getElementById('award_3').innerHTML = "Gold"
  }
})