const express = require("express")
const router = express.Router()
const controllers = require("../controllers")
const bcrypt = require("bcryptjs")
const utils = require("../utils")



router.get("/:action", function(req, res, next) {
    let action = req.params.action

    if(action == "logout") {
        req.session.reset()
        res.json({
            confirmation: "success",
            message: "User logged out"
        })
    }


    if(action == "currentuser") {
        if(req.session == null) {
            res.json({
                confirmation: "success",
                message: "User not logged in"
            })
            return
        }

        if(req.session.token == null) {
            res.json({
                confirmation: "success",
                message: "User not logged in"
            })
            return
        }

        var token = req.session.token

        utils.JWT.verify(token, process.env.TOKEN_SECRET)
        .then(function(decode) {
            return controllers.profile.findById(decode.id)
        })
        .then(function(profile) {
            res.json({
                confirmation: "success",
                profile: profile
            })
        })
        .catch(function(err) {
            res.json({
                confirmation: "fail",
                message: "Invalid token"
            })
        })

    }
})

router.post("/register", function(req, res, next) {
    var credentials = req.body

    controllers.profile
    .create(credentials)
    .then(function(profile) {
        var token = utils.JWT.sign({id: profile.id}, process.env.TOKEN_SECRET)
        req.session.token = token
        console.log("register post: ", profile)
        res.json({
            confirmation: "success",
            profile: profile,
            token: token
        })
    })
    .catch(function(err) {
        res.json({
            confirmation: "fail",
            message: err
        })
    })
})






router.post("/login", function(req, res, next) {
    controllers.profile
    .find({email: req.body.email}, true)
    .then(function(profiles) {
        if(profiles.length == 0) {
            res.json({
                confirmation: "fail",
                message: "Email not found"
            })
            return
        }

        //password check
        var profile = profiles[0]

        var passwordCorrect = bcrypt.compareSync(req.body.password, profile.password)
        if(passwordCorrect) {
            //this token will be attached to the cookie
            var token = utils.JWT.sign({id: profile._id}, process.env.TOKEN_SECRET)
            req.session.token = token

            res.json({
                confirmation: "success",
                profile: profile,
                token: token
            })
            return
        }
        res.json({
            confirmation: "fail",
            message: "Password is not correct"
        })
    })
    .catch(function(err) {
        res.json({
            confirmation: "fail",
            message: err
        })
    })
})


module.exports = router
