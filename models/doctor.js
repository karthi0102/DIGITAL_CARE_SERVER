const mongoose = require('mongoose')
const {Schema}=mongoose

const doctorSchema = new Schema({
        name:String,
        email:String,
        phone:String,
        specialisation:String,
        pay:Number,
        image:String,
        count:Number,
        start:String,
        end:String,
        isOpen:{
            type:Boolean,
            default:false
        },
        token:[
            {
            type:Schema.Types.ObjectId,
            ref:"User"
            }
        ]
})

module.exports = mongoose.model("Doctor",doctorSchema)