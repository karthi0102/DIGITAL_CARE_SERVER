const mongoose = require("mongoose")
const {Schema}=mongoose;

const patientSchema = new Schema({
    name:String,
    image:String,
    phone:Number,
    email:String,
    records:[String],
    location:String,
   logs:[
       {type:Schema.Types.ObjectId,ref:"Logs"}
    ],
    joinedOn:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Patient",patientSchema)