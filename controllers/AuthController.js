const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.post_register_admin = (req, res, next) => {
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let email = req.body.email
  let password = req.body.password
  let role = 'admin'

  User.findOne({ email: email }).then(admin => {
    if(admin){
      console.log("There is an admin/assessor registered with this email already")
      
      return res.status(400).json({
        success: false,
        message: "There is an admin/assessor registered with this email already"
      })
    }
  
    const newAdminUser = new User({
      firstName,
      lastName,
      email,
      password,
      role
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdminUser.password, salt, (err, hash) => {
        if (err) throw err

        newAdminUser.password = hash

        newAdminUser.save().then(() => {
          console.log("Successfully registered admin")

          res.status(200).json({
            success: true,
            message: "Successfully registered admin"
          })
        }).catch(error => {
          console.log("Failed to register admin", error)

          res.status(400).json({
            success: false,
            message: "Failed to register admin"
          })
        })
      })
    })
  })
}

exports.post_register_assessor = (req, res, next) => {
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let email = req.body.email
  let password = req.body.password
  let role = 'assessor'

  User.findOne({ email: email }).then(assessor => {
    if(assessor){
      console.log("There is an admin/assessor registered with this email already")
      
      return res.status(400).json({
        success: false,
        message: "There is an admin/assessor registered with this email already"
      })
    }
  
    const newAssessorUser = new User({
      firstName,
      lastName,
      email,
      password,
      role
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAssessorUser.password, salt, (err, hash) => {
        if (err) throw err

        newAssessorUser.password = hash

        newAssessorUser.save().then(() => {
          console.log("Successfully registered assessor")

          res.status(200).json({
            success: true,
            message: "Successfully registered assessor"
          })
        }).catch(error => {
          console.log("Failed to register assessor", error)

          res.status(400).json({
            success: false,
            message: "Failed to register assessor"
          })
        })
      })
    })
  })
}

exports.post_forgot_password = (req, res, next) => {
  
}

exports.post_reset_password = (req, res, next) => {
  
}

//GET controllers
exports.get_login = (req, res, next) => {
  res.render('auth/login')
}

exports.get_admin_register = (req, res, next) => {
  res.render('auth/admin_register')
}

exports.get_assessor_register = (req, res, next) => {
  res.render('auth/assessor_register')
}

exports.get_forgot_password = (req, res, next) => {
  res.render('auth/forgot_password')
}

exports.get_reset_password = (req, res, next) => {
  res.render('auth/reset_password')
}