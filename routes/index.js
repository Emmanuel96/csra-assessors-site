const express = require("express")
const Router = express.Router()

Router.get('/', (req, res) => {
  res.send(`<h1>App root</h1>`)
})

module.exports = Router