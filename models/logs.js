const mongoose  = require('mongoose')
const {Schema}=mongoose

const logsSchema = new Schema({
        doctorId:{
            type:Schema.Types.ObjectId,
            ref:"Doctor"
        },
        hospitalId:{
            type:Schema.Types.ObjectId,
            ref:"Hospital"
        },
        patientId:{
            type:Schema.Types.ObjectId,
            ref:"Patient"
        },
        date:{
            type:Date,
            default:Date.now
        }
})

module.exports = mongoose.model('Logs',logsSchema)