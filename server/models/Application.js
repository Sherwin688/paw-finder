const mongoose = require("mongoose")

const ApplicationSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }, 
    post_id: {
        type: String,
        required: true
    },
    post_title:{
        type: String,
        required: true
    }
})

const Application = mongoose.model("Application", ApplicationSchema)
module.exports = Application