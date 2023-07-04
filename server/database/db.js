require("dotenv").config()
const mongoose = require("mongoose")
const MongoDB_URL = process.env.MongoDB_URL

const connection = async () => {
    try {
        await mongoose.connect(MongoDB_URL)
        await mongoose.connection.useDb("paw-finder");
        console.log("Connected to Database Successfully");
    } catch (error) {
        console.log("Error Connecting to Database ", error);
    }

}
module.exports = { connection }
