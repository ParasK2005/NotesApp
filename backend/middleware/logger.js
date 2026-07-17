const logger = (req,res,next)=>{
    console.log("request received")
    next()
}
module.exports = logger