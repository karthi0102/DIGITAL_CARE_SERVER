const mongoose  = require('mongoose')
const {Schema}=mongoose

const hospitalSchema = new Schema({
    name:String,
    password:String,
    address:String,
    email:String,
    phone:Number,
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