const mongoose = require("mongoose")

const BookmarkSchema = mongoose.Schema({
    profile: {type: String, default: ""},
    url: {type: String, trim: true, default: ""},
    title: {type: String, default: ""},
    description: {type: String, default: ""},
    image: {type: String, default: ""},
    timestamp: {type: Date, default: Date.now}
})


BookmarkSchema.methods.summary = function() {
    var summary = {
        profile: this.profile,
        title: this.title,
        description: this.description,
        url: this.url,
        timestamp: this.timestamp,
        id: this._id
    }
    return summary
}


module.exports = mongoose.model("BookmarkSchema", BookmarkSchema)
