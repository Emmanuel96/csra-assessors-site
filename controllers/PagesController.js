const Application = require("../models/Application")
const Score = require('../models/Score')
const logger = require('../utils/logger')

// GET controllers
exports.get_completed_applications = (req, res, next) => {
  Application.find({ finished: true, scoredByAssessors: false }).then(data => {
    res.status(200).json(data)
  }).catch(error => {
   logger.error(error)
    res.status(404).end()
  })
}

exports.get_application_data = (req, res, next) => {
  let ID = req.params.id
  Application.findById(ID).then(data => {
    res.status(200).json(data)
  }).catch(error => {
   logger.error(error)
    res.status(404).end()
  })
}

exports.get_application_score = (req, res, next) => {
  let applicationID = req.params.id
  Score.findOne({ application: applicationID, assessorID: req.user._id.toString() }).then(data => {
    if(data){
      return res.status(200).json(data)
    }
    res.status(400).json({
      success: false,
      message: "Application has no previous score"
    })
  }).catch(error => {
   logger.error(error)
    res.status(404).end()
  })
}

// UPDATE controllers
exports.update_application_score = (req, res, next) => {
  let applicationID = req.params.id
  const {
    csr_benefit_score,
    environmental_benefit_score,
    social_benefit_score,
    staff_benefit_score,
    workplace_benefit_score,
    charitable_benefit_score,
    financial_benefit_score,
    commitment_score,
    evidence_score,
    degree_of_originality_score,
    future_expansion_score,
    replicability_score,
    special_merit_score,
    comment
  } = req.body
  Score.findOneAndUpdate(
    { application: applicationID, assessorID: req.user._id.toString() },
    {
      csr_benefit_score,
      environmental_benefit_score,
      social_benefit_score,
      staff_benefit_score,
      workplace_benefit_score,
      charitable_benefit_score,
      financial_benefit_score,
      commitment_score,
      evidence_score,
      degree_of_originality_score,
      future_expansion_score,
      replicability_score,
      special_merit_score,
      comment
    },
    { new: true, runValidators: true, context: 'query' }
  ).then(() => {
    logger.info("Score is updated!")
    res.status(200).end()
  }).catch(error => {
    logger.error("Failed to update score", error)
    res.status(400).end()
  })
}

// POST controllers
exports.score_application = (req, res, next) => {
  Score.findOne({ assessorID: req.user._id.toString(), applicationID: req.params.id }).then(score => {
    if(score){
      logger.info("You have already scored this application before")
      res.status(400).json({
        success: false,
        message: "You have already scored this application before"
      })
    } else{
      Score.find({ applicationID: req.params.id }).then(scores => {
        if(scores.length < 3){
          const newScore = new Score({
            applicationID: req.params.id,
            assessorID: req.user._id.toString(),
            csr_benefit_score: req.body.csr_benefit_score,
            environmental_benefit_score: req.body.environmental_benefit_score,
            social_benefit_score: req.body.social_benefit_score,
            staff_benefit_score: req.body.staff_benefit_score,
            workplace_benefit_score: req.body.workplace_benefit_score,
            charitable_benefit_score: req.body.charitable_benefit_score,
            financial_benefit_score: req.body.financial_benefit_score,
            commitment_score: req.body.commitment_score,
            evidence_score: req.body.evidence_score,
            degree_of_originality_score: req.body.degree_of_originality_score,
            future_expansion_score: req.body.future_expansion_score,
            replicability_score: req.body.replicability_score,
            special_merit_score: req.body.special_merit_score,
            comment: req.body.comment
          })
        
          newScore.save().then(() => {
            logger.info("Score saved!")
            res.status(200).json({ success: true, message: "Score saved!" })
          })
        } else{
          logger.info("This application has been scored by 3 assesors already. Proceed to the next application")
          res.status(400).json({ success: false, message: "This application has been scored by 3 assesors already. Proceed to the next application" })
        }
      })
    }
  }).then(() => {
    // checks if application is scored by 3 assesors and updates 'scoredByAssessors' to true
    Score.find({ applicationID: req.params.id }).then(scores => {
      let ID = req.params.id
      if(scores.length === 3){
        Application.findByIdAndUpdate(
          ID, 
          { scoredByAssessors: true },
          { new: true, runValidators: true, context: 'query' }
        ).then(() => {
          logger.info("Jackpot, application has been scored by 3 assessors")
        })
      }else{
        logger.info("Only", scores.length, " have scored this application")
      }
    })
  })
}

//GET pages controllers
exports.get_applications_list = (req, res, nect) => {
  res.render('pages/applications')
}

exports.preview_application = (req, res, nect) => {
  res.render('pages/application_preview')
}

exports.score_application_page = (req, res, next) => {
  res.render('pages/score')
}

exports.score_table_page = (req, res, next) => {
  res.render('pages/score_table')
}