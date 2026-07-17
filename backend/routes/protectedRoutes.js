const express = require("express")
const router = express.Router()
const authmiddleware = require("../middleware/authMiddleware")

router.get("/protected",authmiddleware,(req,res)=>{
    res.json({
        message:"you are authorized",
        user:req.user
    })
})

module.exports = router
