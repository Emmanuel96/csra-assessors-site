const express = require("express")
const Router = express.Router()
const checkAuthenticated = require('../passport/checkAuthenticated')
const isAdmin = require('../passport/isAdmin')
const PagesController = require('../controllers/PagesController')

//GET routes
Router.get('/api/applications', PagesController.get_completed_applications)

Router.get('/api/applications/:id', PagesController.get_application_data)

Router.get('/api/application_score/:id', PagesController.get_application_score)

// UPDATE routes
Router.put('/api/score/application/:id', PagesController.update_application_score)

//GET pages routes
Router.get('/applications', checkAuthenticated, PagesController.get_applications_list)

Router.get('/applications/:id', checkAuthenticated, PagesController.preview_application)

Router.get('/score/:id', checkAuthenticated, PagesController.score_application_page)

Router.get('/score_table', isAdmin, PagesController.score_table_page)

module.exports = Router