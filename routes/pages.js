const express = require("express")
const Router = express.Router()
const isAdmin = require('../passport/isAdmin')
const isAssessor = require('../passport/isAssessor')
const PagesController = require('../controllers/PagesController')

//GET routes
Router.get('/api/applications', PagesController.get_completed_applications)

Router.get('/api/assessed_applications', PagesController.get_assessed_applications)

Router.get('/api/applications/:id', PagesController.get_application_data)

Router.get('/api/application_score/:id', PagesController.get_application_score)

Router.get('/api/all_application_scores/:id', PagesController.get_all_application_scores)

// UPDATE routes
Router.put('/api/update_score/application/:id', PagesController.update_application_score)

// POST route
Router.post('/api/score/application/:id', PagesController.score_application)

//GET pages routes
Router.get('/application_score_details/:id', isAdmin, PagesController.get_application_score_details)

Router.get('/applications', isAssessor, PagesController.get_applications_list)

Router.get('/applications/:id', isAssessor, PagesController.preview_application)

Router.get('/score/:id', isAssessor, PagesController.score_application_page)

Router.get('/assessed_applications', isAdmin, PagesController.assessed_applications_page)

module.exports = Router