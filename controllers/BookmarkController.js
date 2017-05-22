const Bookmark = require("../models/Bookmark")
const Promise = require("bluebird")
const superagent = require("superagent")
const utils = require("../utils")



module.exports = {
    find: function(params) {
        return new Promise(function(resolve, reject) {
            Bookmark.find(params, function(err, bookmarks) {
                if(err) {
                    reject(err)
                    return
                }
                var summaries = []
                bookmarks.forEach(function(bookmark) {
                    summaries.push(bookmark.summary())
                })
                resolve(summaries)
            })
        })
    },

    findById: function(id) {
        return new Promise(function(resolve, reject) {
            Bookmark.findById(id, function(err, bookmark) {
                if(err) {
                    reject(err)
                    return
                }
                resolve(bookmark.summary())
            })
        })
    },

    create: function(params) {
        return new Promise(function(resolve, reject) {

            superagent
            .get(params.url)
            .query(null)
            .set("Accept", "text/html")
            .end(function(err, response) {
                if(err) {
                    reject(err)
                    return
                }

                var html = response.text
                var metaData = utils.scraper.scrape(html,["og:title", "og:url", "og:description", "og:image"] )
                var keys = Object.keys(metaData)
                keys.forEach(function(key, i) {
                    params[key] = metaData[key]
                })
                Bookmark.create(params, function(err, bookmark) {
                    if(err) {
                        reject(err)
                        return
                    }
                    resolve(bookmark)
                })
            })


        })
    }

}
