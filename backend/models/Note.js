const mongoose = require("mongoose")

const noteschema =new mongoose.Schema(

    {
        title:{
            type:String,
            required:true,
            trim:true,
        },
        content:{
            type:String,
            required:true,

        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

    },
    { timestamps:true }
)
const note = mongoose.model("note",noteschema)

module.exports = note