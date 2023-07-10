const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true
    },
    createdDate: {
        type: Date
    },
    user_name:{
        type:String,
        required:true
    },
    user_phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post