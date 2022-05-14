const express = require("express")
const Router = express.Router()
const checkAuthenticated = require('../passport/checkAuthenticated')
const DashboardController = require('../controllers/DashboardController')

//GET routes
Router.get('/dashboard', checkAuthenticated, DashboardController.get_dashboard)

module.exports = Router