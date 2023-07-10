require('dotenv').config();

const jwt = require("jsonwebtoken")

const authenticateUser = (req,res,next)=>{
    try {
        const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

        if(!token){
            return res.status(404).json({msg:"Token is missing"})
        }

        jwt.verify(token,process.env.ACCESS_KEY,(error,user)=>{
            if(error){
                return res.status(500).json({msg:"error",error})
            }
            req.user=user
            next()
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"error authenticating user"})

    }


    
}

module.exports = {authenticateUser}
