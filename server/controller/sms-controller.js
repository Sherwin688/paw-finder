require("dotenv").config()
const express = require("express")
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require("twilio")(accountSid,authToken)

