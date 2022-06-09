const Application = require("../models/Application")
const Score = require('../models/Score')
const logger = require('../utils/logger')

// GET controllers
exports.get_completed_applications = (req, res, next) => {
  Application.find({ finished: true }).then(data => {
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
  Score.findOne({ application: applicationID }).then(data => {
    res.status(200).json(data)
  }).catch(error => {
   logger.error(error)
    res.status(404).end()
  })
}

// UPDATE controllers
exports.update_application_score = (req, res, next) => {
  let applicationID = req.params.id

  let {
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
    { application: applicationID },
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
  ).then(updatedApplicationScore => {
    logger.info('Updated application score')
    res.status(200).json(updatedApplicationScore)
  }).catch(error => {
    logger.error("Failed to update application score", error)
    res.status(400).end()
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