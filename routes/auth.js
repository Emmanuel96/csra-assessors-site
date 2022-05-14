const express = require("express")
const Router = express.Router()
const AuthController = require('../controllers/AuthController')
const checkNotAuthenticated = require('../passport/checkNotAuthenticated')
const checkAuthenticated = require('../passport/checkAuthenticated')
const isAdmin = require('../passport/isAdmin')
const passport = require('../passport/setup')

//POST routes
Router.post('/api/auth/login',
  passport.authenticate('local', { 
    failureMessage: false,
  }),
  function(req, res) {
    res.json(req.user)
}); 

Router.post('/api/auth/register/admin', AuthController.post_register_admin)

Router.post('/api/auth/register/assessor', AuthController.post_register_assessor)

Router.post('/api/auth/forgot_password', AuthController.post_forgot_password)

Router.post('/api/auth/reset_password', AuthController.post_reset_password)

//DELETE routes
Router.delete('/api/auth/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

//GET routes
Router.get('/register/admin', checkNotAuthenticated, AuthController.get_admin_register)

Router.get('/assessor', isAdmin, AuthController.get_assessor_register)

Router.get('/login', checkNotAuthenticated, AuthController.get_login)

Router.get('/forgot_password', checkNotAuthenticated, AuthController.get_forgot_password)

Router.get('/reset_password', checkAuthenticated, AuthController.get_reset_password)

module.exports = Router