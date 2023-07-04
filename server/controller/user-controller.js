const User = require("../models/User")
const brcypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const signup = async(req,res)=>{
    try {
    const {name,phone,password} = req.body
    const salt = await brcypt.genSalt()
    const hashedPassword = await brcypt.hash(password,salt)
    const user = await new User({
        name,
        phone,
        password:hashedPassword
    })
    await user.save()
    res.status(200).json({msg:"Signup Successful"})
    
} catch (error) {
    console.log(error);
    res.status(500).json({msg:"Error Signing up "})

}
   
}

const login = async(req,res)=>{
    try {
    const {phone,password} = req.body
    const user = await User.findOne({phone})
    if(!user){
        res.status(404).json({msg:"No usser found"})
    }
    const match = await brcypt.compare(password,user.password)
    
    if(match){
        const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_KEY,{expiresIn:"55m"})
        const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_KEY)
        return res.status(200).json({accessToken,refreshToken,name:user.name,phone:user.phone})
    }
    else{
        return res.status(401).json({msg:"Wrong username or password"})

    }
} catch (error) {
    console.log(error);
    return res.status(500).json({msg:"Error Signing up "})

}
   
}

const test = (req,res)=>{
    console.log(req);
    return res.json("works broda")
}

module.exports = {signup,login,test}