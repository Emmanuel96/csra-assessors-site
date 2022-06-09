const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { promisify } = require('util')
const sgMail = require('@sendgrid/mail')
const logger = require('../utils/logger')

exports.post_register_admin = (req, res, next) => {
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let email = req.body.email
  let password = req.body.password
  let role = 'admin'

  Admin.findOne({ email: email }).then(admin => {
    if(admin){
      logger.info("There is an admin/assessor registered with this email already")

      return res.status(400).json({
        success: false,
        message: "There is an admin/assessor registered with this email already"
      })
    }

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password,
      role
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdmin.password, salt, (err, hash) => {
        if (err) throw err

        newAdmin.password = hash

        newAdmin.save().then(() => {

          logger.info("Successfully registered admin")

          res.status(200).json({
            success: true,
            message: "Successfully registered admin"
          })
        }).catch(error => {

          logger.error("Failed to register admin", error)

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

  Admin.findOne({ email: email }).then(assessor => {
    if(assessor){
      logger.info("There is an admin/assessor registered with this email already")

      return res.status(400).json({
        success: false,
        message: "There is an admin/assessor registered with this email already"
      })
    }

    const newAssessor = new Admin({
      firstName,
      lastName,
      email,
      password,
      role
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAssessor.password, salt, (err, hash) => {
        if (err) throw err

        newAssessor.password = hash

        newAssessor.save().then(() => {
          logger.info("Successfully registered assessor")

          res.status(200).json({
            success: true,
            message: "Successfully registered assessor"
          })
        }).catch(error => {
          logger.error("Failed to register assessor", error)

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

  Admin.findOne({ email: req.body.email }).then(user => {
    if(!user){
      return res.status(404).json({
        success: false,
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
      subject: 'Your Password Reset Link',
      html: `Hi ${user.firstName} <br> You are receiving this mail because you (or someone else) have requested to reset the password to your account. <br> Please click on the following link, or paste this into your browser to complete the process: <br> <br> http://${req.headers.host}/reset_password/${token} <br> <br> If you did not request this, please ignore this email and your password will remain unchanged.
      `
    }

    sgMail.send(resetEmail).then(() => {
      logger.info('Reset link was sent to your email address')

      res.status(200).json({
        success: true,
        message: "Reset link was sent to your email address"
      })
    }).catch(error => {
      logger.error(error)

      res.status(400).json({
        success: false,
        message: "There was a problem with your request"
      })
    })
  })
}

exports.post_reset_password = (req, res, next) => {
  let usersArray = []

  Admin.find({}).then((users) => {
    usersArray = users

    const thisUser = usersArray.find(user => user.resetPasswordExpires > Date.now() && crypto.timingSafeEqual(Buffer.from(user.resetPasswordToken), Buffer.from(req.params.token)))

    logger.info(thisUser)

    if (!thisUser) return res.status(404).end()

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err

        req.body.password = hash

        let filter = { email: thisUser.email }
        let update = {
          password: req.body.password,
          resetPasswordToken: null,
          resetPasswordExpires: null
        }

        Admin.findOneAndUpdate(filter, update).then((feedback) => {
          logger.info(feedback)

          logger.info("Successfull password reset!")

          res.status(200).json({
            success: true,
            message: "Your password was successfully updated"
          })

          const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

          sgMail.setApiKey(SENDGRID_API_KEY)

          const newPasswordConfirmation = {
            to: 'stephenbuluswayar@gmail.com',
            from: 'emmanuel@csr-accreditation.co.uk',
            subject: 'Password Reset Successful!',
            html: `This is a confirmation that the password for your account "${thisUser.email}" has just been changed.
            `
          }

          sgMail.send(newPasswordConfirmation).then(() => {
            logger.info("Password confirmation sent")
          }).catch(err => logger.error("Failed to send confirmation", err))

        }).catch((err) => {
          res.status(400).json({
            success: false,
            message: "Failed to update"
          })
          logger.error("Failed to update: ", err)
        })
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

  Admin.find({}).then((users) => {
    usersArray = users

    const thisUser = usersArray.find(user => user.resetPasswordExpires > Date.now() && crypto.timingSafeEqual(Buffer.from(user.resetPasswordToken), Buffer.from(req.params.token)))

    if (!thisUser) {
      return res
        .status(404)
        .send(`
        <div style="text-align: center;">
          <h1 style="font-size: 1.87rem; color: #555A6E; padding: 2.5rem; font-weight: bold;" >
          Password reset token is invalid or has <span style="color: rgb(146, 29, 29)">expired.</span>
          </h1>
    
          <button style="border: none; background-color: #00A19A; padding-top: 0.75rem; padding-bottom: 0.75rem; padding-left: 1.7rem; padding-right: 1.7rem; border-radius: 0.25rem; color: white;">
            <a style="text-decoration: none; color: white" href="/forgot_password">Request new link</a
          </button>
        </div>
        `)
        .end()
    }
    res.render('auth/reset_password')
  })
}