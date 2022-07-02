const express = require("express")
const Router = express.Router()
const checkAuthenticated = require('../passport/checkAuthenticated')

Router.get('/', (req, res) => {
  res.redirect('/login');
})

Router.get('/home', checkAuthenticated, (req, res) => {
  res.render('index', { title: 'CSRA' });
})

module.exports = Router