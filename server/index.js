const express = require('express')
const { connection } = require("./database/db")
const router = require("./routes/route")
require("dotenv").config()
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(cors())
app.use("/",router)

app.listen(PORT,()=>{
    console.log("Server Running on Port: ",PORT);
})

connection()