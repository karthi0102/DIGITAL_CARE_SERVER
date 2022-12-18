const express = require("express")
const app=express()
const cors=require("cors")
const mongoose=require("mongoose")
const dotenv = require("dotenv")
const path=require('path')
const SerpApi =require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("b87e2c676fbba149af95c0f8e39c7a28fdeb9cec46c5a3cd57b7a8d2de244a4e");
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

app.post('/chatbot',async(req,res)=>{
    const {message} = req.body
  const params = {
    q: `${message}`,
    location: "India",
    google_domain: "google.com",
    hl: "en",
    gl: "us"
  };
  try{
  const callback = function(data) {
    res.status(200).json(data)
  };
  
  // Show result as JSON
  search.json(params, callback);
  // console.log(ansData);
  // res.status(200).json(ansData)
  
}catch(err){
  res.status(500).json({message:err.message})
}
})
const PORT = process.env.PORT || 8080;
app.listen(PORT ,()=>{
    console.log(`Server is listening on ${PORT}`)
})




