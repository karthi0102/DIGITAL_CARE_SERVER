const mongoose = require('mongoose')
const {Schema}=mongoose

const doctorSchema = new Schema({
        name:String,
        pay:Number,
        phone:String,
        isOpen:Boolean,
        specialisation:[String],
        token:[
            {
            type:Schema.Types.ObjectId,
            ref:"User"
            }
        ]
})

module.exports = mongoose.model("Doctor",doctorSchema)