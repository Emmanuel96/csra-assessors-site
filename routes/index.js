const express = require("express")
const Router = express.Router()

Router.get('/', (req, res) => {
  res.render('index', { title: 'CSRA' });
})

module.exports = Router