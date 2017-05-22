const express = require('express');
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const sessions = require("client-sessions")
require("dotenv").config()


const index = require('./routes/index')
const api = require('./routes/api')
const account = require("./routes/account")

mongoose.connect(process.env.DB_URL, function(err, res) {
    if(err) {
        console.log("db connection fail", err)
    } else {
      console.log("db connection good to go")
    }
})


const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hjs')

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sessions({
    cookieName: "session",
    secret: process.env.SESSION_SECRET,
    duration: 24*60*60*1000,
    activeDuration: 30*60*1000
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/api', api)
app.use("/account", account)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
