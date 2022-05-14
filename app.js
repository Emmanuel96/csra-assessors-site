require('dotenv').config()

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')

const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const methodOverride = require('method-override')

const dashRouter = require('./routes/dash')
const authRouter = require('./routes/auth')
const indexRouter = require('./routes/index')
const middleware = require('./utils/middleware')

const app = express()
const DB = require("./database/mongodb")

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use('/', authRouter)
app.use('/', dashRouter)
app.use('/', indexRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app