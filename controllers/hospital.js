const Patient = require('../models/patient.js')
const Hospital = require('../models/hospital.js')
const Doctor = require('../models/doctor.js')
const mongoose = require('mongoose')
const jwt=  require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports.signUp = async(req,res)=>{
   
    const {name,email,phone,address,password} = req.body
    try {
        const existinguser = await Hospital.findOne({email})
        console.log(name,email,phone,address,password)
        if(existinguser){
            return res.status(400).send("User found already")
        }
        const hashPassword = await bcrypt.hash(password,12);
        conaole.log(name,email,phone,address,password)
        const newUser =  new Hospital({name,email,phone,address,password:hashPassword})
        await newUser.save();
        console.log(newUser)
        const token = jwt.sign({email:newUser.email,id:newUser._id},'token',{expiresIn:'1h'})
        res.status(200).json({result:newUser,token})
    } catch (err) {
        console.log(err.message)
        res.status(500).json('Something went worng...')
    }
}

module.exports.login = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const existinguser = await Hospital.findOne({email}).populate('enrolled')
        if(!existinguser){
            return res.status(404).json({message:"User not found..."})
        }
        const isPasswordCrt = await bcrypt.compare(password,existinguser.password)
        if(!isPasswordCrt){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({email:existinguser.email,id:existinguser._id},'token',{expiresIn:'48h'})
        res.status(200).json({result:existinguser,token})
    }catch(err){
        res.status(500).json(err.message)
    }
}

