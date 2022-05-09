const express = require("express")
const Router = express.Router()
const AuthController = require('../controllers/AuthController')

//Admin POST routes
Router.post('/api/auth/admin/signin', AuthController.post_admin_signin)

Router.post('/api/auth/admin/signup', AuthController.post_admin_signin)

module.exports = Router