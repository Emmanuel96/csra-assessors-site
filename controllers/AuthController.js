const User = require('../models/User')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { promisify } = require('util')
const sgMail = require('@sendgrid/mail')

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

exports.post_forgot_password = async (req, res, next) => {
  const token = (await promisify(crypto.randomBytes)(20)).toString('hex')

  User.findOne({emai: req.body.email}).then(user => {
    if(!user){
      return res.status(404).json({
        message: "No user with this email exists"
      })
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000
    user.save()

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

    sgMail.setApiKey(SENDGRID_API_KEY)

    const resetEmail = {
      to: 'stephenbuluswayar@gmail.com',
      from: 'emmanuel@csr-accreditation.co.uk',
      subject: 'Password Reset',
      html: `You are receiving this because you (or someone else) have requested to reset the password to your account. <br> Please click on the following link, or paste this into your browser to complete the process: <br> <br> http://${req.headers.host}/reset_password/${token} <br> <br> If you did not request this, please ignore this email and your password will remain unchanged.
      `
    }

    sgMail.send(resetEmail).then(() => {
      console.log('Reset link was sent to your email address')

      res.status(200).json({
        success: true,
        message: "Reset link was sent to your email address"
      })
    }).catch(error => {
      console.log(error)

      res.status(400).json({
        success: false,
        message: "There was a problem with your request"
      })
    })
  })
}

exports.post_reset_password = (req, res, next) => {
  let usersArray = []

  User.find({}).then((users) => {
    usersArray = users

    const thisUser = usersArray.find(user => user.resetPasswordExpires > Date.now() && crypto.timingSafeEqual(Buffer.from(user.resetPasswordToken), Buffer.from(req.params.token)))

    console.log(thisUser)

    if (!thisUser) {
      return res
        .status(404)
        .send(`<h1>Password reset token is invalid or has expired.</h1>`)
        .end()
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err

        req.body.password = hash

        let filter = { emai: thisUser.email}
        let password = {
          password: req.body.password,
          resetPasswordToken: null,
          resetPasswordExpires: null
        }
    
        User.findOneAndUpdate(filter, password).then(() => {
          console.log("Successfull password reset!")

          res.status(200).json({
            success: true,
            message: "Your password was successfully updated"
          })

          const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

          sgMail.setApiKey(SENDGRID_API_KEY)
      
          const newPasswordConfirmation = {
            to: 'stephenbuluswayar@gmail.com',
            from: 'emmanuel@csr-accreditation.co.uk',
            subject: 'Password Change Confirmation',
            html: `This is a confirmation that the password for your account "${thisUser.email}" has just been changed.
            `
          }

          sgMail.send(newPasswordConfirmation).then(() => {
            console.log("Password confirmation sent")
          }).catch(err => console.log("Failed to send confirmation", err))

        }).catch(() => console.log("Failed to update")) 
      })
    })  
  })  
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
  let usersArray = []

  User.find({}).then((users) => {
    usersArray = users

    const thisUser = usersArray.find(user => user.resetPasswordExpires > Date.now() && crypto.timingSafeEqual(Buffer.from(user.resetPasswordToken), Buffer.from(req.params.token)))

    if (!thisUser) {
      return res
        .status(404)
        .send(`<h1>Password reset token is invalid or has expired.</h1>`)
        .end()
    }

    res.render('auth/reset_password')
  })
}