
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registeruser = async (req,res)=>{
try{
    const {name,email,password} = req.body
    if(!name||!email||!password){
        return res.status(400).json({
            message:"all fields are required"
        })
    }
    const existinguser = await User.findOne({email})

    if(existinguser){
        return res.status(400).json({
            message:"user already exists !"
        })
    }
    const hashpassword = await bcrypt.hash(password,10)

    const user = await User.create({
        name,
        email,
        password:hashpassword
    })
    res.status(201).json({
        message:"user register succesfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
        },
    })

}
catch(error){
    console.log(error);

    res.status(500).json({
        message: error.message,
    });
}}

const loginuser = async (req,res)=>{
    try{
        await new Promise(resolve => setTimeout(resolve, 2000));
        const {email,password}=req.body
        if(!email||!password){
            return res.status(400).json({
                message:"email password are required"
        })
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"inavlid credentials"
        })

    }
    const ismatch = await bcrypt.compare(password,user.password)
    if(!ismatch){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }
    const token = jwt.sign(
        {id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"1d"}
    )
    res.json({
        message:"login succesfull",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
        }
    })
}
    catch(error){
        return res.status(400).json({
            message:error.message,
        })

    }

}

module.exports = {registeruser,loginuser}