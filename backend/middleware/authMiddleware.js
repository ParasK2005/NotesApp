const jwt = require("jsonwebtoken")

const authmiddleware = (req,res,next)=>{
    try{
      const authheader = req.headers.authorization

      if(!authheader){
        return res.status(401).json({
            message:"no token provided!"
        })
      }

      const token = authheader.split(" ")[1]
      if(!token){
        return res.status(401).json({
            message:"invalid token format!"
        })
      }

      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      req.user = decoded
      next()
    }
    catch(error){
    return res.status(401).json({
            message:"unauthorized access"
        })
    }

}

module.exports = authmiddleware
