const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
const logger = require('../utils/logger')

logger.info("Connecting to mongoDB...")

mongoose
  .connect(url)
  .then(() => {
    console.log("Successfully connected to MongoDB!")
  }).catch(err => {
    console.log("Failed to connect to MongoDB: ", err.message)
})