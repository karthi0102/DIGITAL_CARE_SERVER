const mongoose = require('mongoose')
const {Schema}=mongoose

const doctorSchema = new Schema({
        name:String,
        pay:Number,
        phone:String,
        isOpen:Boolean,
        token:[
            {
            type:Schema.Types.ObjectId,
            ref:"User"
            }
        ]
})

module.exports = mongoose.model("Doctor",doctorSchema)