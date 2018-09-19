var mongoose = require("mongoose")
var noteSchema = mongoose.Schema({
    articleid: String,
    text: String
})
module.exports = mongoose.model("Note", noteSchema)