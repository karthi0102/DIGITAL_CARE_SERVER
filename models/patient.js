const mongoose = require("mongoose")
const {Schema}=mongoose;

const patientSchema = new Schema({
    name:String,
    image:String,
    phone:Number,
    email:String,
    records:[String],
    logs:[
        {
            patient:{
                type:Schema.Types.ObjectId,
                ref:"Patient"
            },
            doctor:{
                type:Schema.Types.ObjectId,
                ref:"Patient"
            },
            date:{
                type:Date,
            }
        }
    ],
    joinedOn:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Patient",patientSchema)