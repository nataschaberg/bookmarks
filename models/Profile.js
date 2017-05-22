const mongoose = require("mongoose")

const ProfileSchema = mongoose.Schema({
    firstName: {type: String, trim: true, default: ""},
    lastName: {type: String, trim: true, default: ""},
    email: {type: String, trim: true, lowercase: true, default: ""},
    password: {type: String, default: ""},
    timestamp: {type: Date, default: Date.now}
})



ProfileSchema.methods.summary = function() {
    var summary = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        timestamp: this.timestamp,
        id: this._id
    }
    return summary
}




module.exports = mongoose.model("ProfileSchema", ProfileSchema)
