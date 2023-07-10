require("dotenv").config()
const User = require("../models/User")
const brcypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER
const client = require("twilio")(accountSid, authToken)
let otpCode,newUser

// const signup = async(req,res)=>{
//     try {
//     const {name,phone,password} = req.body
//     const salt = await brcypt.genSalt()
//     const hashedPassword = await brcypt.hash(password,salt)
//     const user = await new User({
//         name,
//         phone,
//         password:hashedPassword
//     })
//     await user.save()
//     res.status(200).json({msg:"Signup Successful"})

// } catch (error) {
//     console.log(error);
//     res.status(500).json({msg:"Error Signing up "})

// }

// }
const generateOtp = async (req, res) => {
    try {
        const { name, phone, password } = req.body
        const existingUser = await User.findOne({ phone })
        // return res.json({name,phone,password})
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists with that phone number" })
        }
        const salt = await brcypt.genSalt()
        const hashedPassword = await brcypt.hash(password,salt)
        newUser = await new User({
            name,
            phone,
            password:hashedPassword
        })

        otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await client.messages
            .create({
                body: `Your OTP code is: ${otpCode}`,
                from: twilioPhoneNumber,
                to: "+91"+phone,
            })
            .then(() => {
                return res.status(200).json({msg:'OTP sent successfully'});
            })
            .catch((error) => {
                console.error('Error sending OTP:', error);
                return res.status(500).json({msg:'could not send otp'});
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error sending otp" })

    }

}

const verifyOtp = async(req,res)=>{
    try {
        console.log(req.body);
        const {otp} = req.body
        console.log("otp");
        console.log(otp);
        console.log("otpCode");
        console.log(otpCode);
        if(otpCode!==otp){
            return res.status(400).json({msg:"incorrect otp"})
        }
        await newUser.save()
        return res.status(200).json({msg:"Signup Successful"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error verifying otp" })

    }
}

const login = async (req, res) => {
    try {
        const { phone, password } = req.body
        const user = await User.findOne({ phone })
        if (!user) {
            return res.status(404).json({ msg: "No usser found" })
        }
        const match = await brcypt.compare(password, user.password)

        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: "55m" })
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_KEY)
            return res.status(200).json({ accessToken, refreshToken, name: user.name, phone: user.phone })
        }
        else {
            return res.status(401).json({ msg: "Wrong username or password" })

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error Signing up " })

    }

}

const test = (req, res) => {
    console.log(req);
    return res.json("works broda")
}

module.exports = { verifyOtp, login, test,generateOtp }