const mongoose = require("mongoose")


const MessageSchema = mongoose.Schema({
    message: { type: String, require: true },
    conversetionID: { type: String, require: true },
    senderID: { type: String, require: true },
})
module.exports = mongoose.model("Message", MessageSchema)