const express = require("express")
const Router = express.Router()
const MediaController = require('../controllers/MediaController')

Router.get('/api/media/download/:id', MediaController.download_all)

module.exports = Router