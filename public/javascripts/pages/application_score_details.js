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

  function switchFunction(arrVal){
    switch (arrVal) {
      case 'csr_benefit_score':
        outputText = "Clear CSR Impact";
        break;
      case 'environmental_benefit_score':
        outputText = "Environmental Benefits";
        break;
      case 'social_benefit_score':
         outputText = "Social Benefit";
        break;
      case 'staff_benefit_score':
        outputText = "Staff Benefit";
        break;
      case 'workplace_benefit_score':
        outputText = "Workplace Benefit";
        break;
      case 'charitable_benefit_score':
        outputText = "Charitable Benefit";
        break;
      case 'financial_benefit_score':
        outputText = "Financial Benefit";
        break;
      case 'commitment_score':
        outputText = "Commitment of the entrants";
        break;
      case 'evidence_score':
        outputText = "Evidence of measurable impact";
        break;  
      case 'degree_of_originality_score':
        outputText = "Degree of originality/innovation";
        break;  
      case 'future_expansion_score':
        outputText = "Future expansion";
        break; 
      case 'replicability_score':
        outputText = "Replicability";
        break;    
      case 'special_merit_score':
        outputText = "Special Merit";
    }
    return outputText
  }

  function sortLowestThree(obj){
    let sortable = Object.entries(obj).filter(i => {
      if (typeof i[1] === 'number'){
        return i
      }
    })

    sortable.sort(function(a, b) {
      return a[1] - b[1]
    })
  
    let lowestThree = sortable.slice(0, 3)

    return lowestThree
  }

  function sortHighestThree(obj){
    let sortable = Object.entries(obj).filter(i => {
      if (typeof i[1] === 'number'){
        return i
      }
    })

    sortable.sort(function(a, b) {
      return a[1] - b[1]
    })
  
    let highestThree = sortable.slice(-3)

    return highestThree
  }

  // Assessor 1 section three lowest scores display
  document.getElementById('1_lowest_1').innerHTML = switchFunction(sortLowestThree(scores[0])[0][0])

  document.getElementById('1_lowest_2').innerHTML = switchFunction(sortLowestThree(scores[0])[1][0])

  document.getElementById('1_lowest_3').innerHTML = switchFunction(sortLowestThree(scores[0])[2][0])

  // Assessor 1 section three highest scores display
  document.getElementById('1_highest_1').innerHTML = switchFunction(sortHighestThree(scores[0])[0][0])

  document.getElementById('1_highest_2').innerHTML = switchFunction(sortHighestThree(scores[0])[1][0])

  document.getElementById('1_highest_3').innerHTML = switchFunction(sortHighestThree(scores[0])[2][0])


  // Assessor 2 section three lowest scores display
  document.getElementById('2_lowest_1').innerHTML = switchFunction(sortLowestThree(scores[1])[0][0])

  document.getElementById('2_lowest_2').innerHTML = switchFunction(sortLowestThree(scores[1])[1][0])

  document.getElementById('2_lowest_3').innerHTML = switchFunction(sortLowestThree(scores[1])[2][0])

  // Assessor 2 section three highest scores display
  document.getElementById('2_highest_1').innerHTML = switchFunction(sortHighestThree(scores[1])[0][0])

  document.getElementById('2_highest_2').innerHTML = switchFunction(sortHighestThree(scores[1])[1][0])

  document.getElementById('2_highest_3').innerHTML = switchFunction(sortHighestThree(scores[1])[2][0])


  // Assessor 3 section three lowest scores display
  document.getElementById('3_lowest_1').innerHTML = switchFunction(sortLowestThree(scores[2])[0][0])

  document.getElementById('3_lowest_2').innerHTML = switchFunction(sortLowestThree(scores[2])[1][0])

  document.getElementById('3_lowest_3').innerHTML = switchFunction(sortLowestThree(scores[2])[2][0])

  // Assessor 3 section three highest scores display
  document.getElementById('3_highest_1').innerHTML = switchFunction(sortHighestThree(scores[2])[0][0])

  document.getElementById('3_highest_2').innerHTML = switchFunction(sortHighestThree(scores[2])[1][0])

  document.getElementById('3_highest_3').innerHTML = switchFunction(sortHighestThree(scores[2])[2][0])

})