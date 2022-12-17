const mongoose  = require('mongoose')
const {Schema}=mongoose

const hospitalSchema = new Schema({
    name:String,
    password:String,
    address:String,
    email:String,
    phone:String,
    logs:[
       {type:Schema.Types.ObjectId,ref:"Logs"}
    ],
    doctors:[
        {
            type:Schema.Types.ObjectId,
            ref:'Doctor'
        }
    ],
    createdOn:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Hospital',hospitalSchema)