const mongoose = require("mongoose")

const NotificationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    for:{
        type:String,
        required:true
    },
    time: {
        type: String,
        default: new Date().toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })
    }
})

const Notification = mongoose.model("Notification", NotificationSchema)
module.exports = Notification