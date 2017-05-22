const express = require("express")
const router = express.Router()
const controllers = require("../controllers")

router.get("/:resource", function(req, res, next) {
    let resource = req.params.resource
    let controller = controllers[resource]

    if(controller == null) {
        res.json({
            confirmation: "fail",
            message: "Invalid Resource"
        })
        return
    }

    controller.find(req.query, false)
    .then(function(entities) {
        //result will be an array
        res.json({
            confirmation: "success",
            result: entities
        })
    })
    .catch(function(err) {
        res.json({
            confirmation: "fail",
            message: "Not found"
        })
    })
})

router.get("/:resource/:id", function(req, res, next) {
    let resource = req.params.resource
    let id = req.params.id
    let controller = controllers[resource]

    if(controller == null) {
        res.json({
            confirmation: "fail",
            message: "Invalid resource"
        })
        return
    }

    controller.findById(id)
    .then(function(result) {
        res.json({
            confirmation: "success",
            result: result
        })
    })
    .catch(function(err) {
        res.json({
            confirmation: "fail",
            message: "Resource not found"
        })
    })
})




router.post("/:resource", function(req, res, next) {
    let resource = req.params.resource
    let controller = controllers[resource]

    if(controller == null) {
        res.json({
            confirmation: "fail",
            message: "Invalid resource"
        })
        return
    }

    controller.create(req.body)
    .then(function(result) {
        res.json({
            confirmation: "success",
            result: result
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
