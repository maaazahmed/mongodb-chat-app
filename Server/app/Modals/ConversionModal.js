const mongoose = require("mongoose");


const conversationSchema = mongoose.Schema({
    conversetionIdS: { type: Array, require: true },
})



module.exports = mongoose.model("Conversations", conversationSchema)