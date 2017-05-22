const cheerio = require("cheerio")
const express = require("express")
const router = express.Router()
const superagent = require("superagent")
const utils = require("../utils")



router.get("/", function(req, res, next) {
    var url = req.query.url
    if(url == null) {
        res.json({
            confirmation: "fail",
            message: "Please enter url"
        })
        return
    }

    superagent
    .get(url)
    .query(null)
    .set("Accept", "text/html")
    .end(function(err, response) {
        if(err) {
            res.json({
                confirmation: "fail",
                message: err
            })
            return
        }
        // res.send(response.text)
        var html = response.text
        var metaData = utils.scraper.scrape(html,["og:title", "og:url", "og:description", "og:image"] )
        
        res.json({
            confirmation: "success",
            tags: metaData
        })

    })


})

module.exports = router
