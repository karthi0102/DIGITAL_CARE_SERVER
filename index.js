const express = require("express")
const app=express()
const cors=require("cors")
const mongoose=require("mongoose")
const dotenv = require("dotenv")
const path=require('path')

const logRoutes =require("./routes/logs.js")
const doctorRoutes = require('./routes/doctor.js')
const hospitalRoutes = require('./routes/hospital.js')
const patientRoutes = require('./routes/patient.js')
dotenv.config()
mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR",err.message)
})
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.json({extended:true}))
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use('/patient',patientRoutes)
app.use('/doctor',doctorRoutes)
app.use('/hospital',hospitalRoutes)
app.use('/logs',logRoutes)
app.get('/',(req,res)=>{
    res.send("DIGITAL CARE")
})
const PORT = process.env.PORT || 8080;
app.listen(PORT ,()=>{
    console.log(`Server is listening on ${PORT}`)
})
