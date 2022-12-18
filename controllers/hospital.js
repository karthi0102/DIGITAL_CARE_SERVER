const Patient = require('../models/patient.js')
const Hospital = require('../models/hospital.js')
const Doctor = require('../models/doctor.js')
const mongoose = require('mongoose')
const Logs = require('../models/logs')
const jwt=  require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports.signUp = async(req,res)=>{
   
    const {name,email,phone,address,password} = req.body
    try {
        const existinguser = await Hospital.findOne({email})
        if(existinguser){
            return res.status(400).send("User found already")
        }
        const hashPassword = await bcrypt.hash(password,12);
        const newUser =  new Hospital({name,email,phone,address,password:hashPassword})
        await newUser.save()
        const token = jwt.sign({email:newUser.email},'token',{expiresIn:'1h'})
        res.status(200).json({result:newUser,token})
    } catch (err) {
        console.log(err.message)
        res.status(500).json('Something went worng...')
    }
}

module.exports.login = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const existinguser = await Hospital.findOne({email}).populate('doctors')
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

module.exports.addDoctor = async(req,res) =>{
    const {name,email,phone,specialisation,pay,img} = req.body
    const {id} = req.params
    try{
        const doctor = new Doctor({name,email,phone,specialisation,pay,image:img})
        await doctor.save()
        const hospital = await Hospital.findById(id)
        hospital.doctors.push(doctor._id)
        await hospital.save()
        const hospitals = await Hospital.findById(id).populate('doctors')
        console.log(hospitals)
        res.status(200).json(hospitals)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.MakeAvailable = async(req,res) =>{
    const {Did,count,Hid} =req.params
    try{
        const doctor = await Doctor.findOneAndUpdate({_id:Did},{count:count,isOpen:true})
        doctor.save()
        const hospital = await Hospital.findById(Hid).populate('logs').populate('doctors')
        res.status(200).json(hospital)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.getDoctor = async(req,res) =>{
    const {Did} =req.params
    try{
        const hospital = await Hospital.findById(Hid).populate('logs').populate('doctors')
        res.status(200).json(hospital)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.updateDoctor = async(req,res) =>{
    const {Did,Hid} =req.params
    const {name,email,phone,specialisaton,pay,image} = req.body
    try{
        const doctor = await Doctor.findOneAndUpdate({_id:Did},{name,email,phone,specialisaton,pay,image})
        doctor.save()
        const hospital = await Hospital.findById(Hid).populate('logs').populate('doctors')
        res.status(200).json(hospital)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.deleteDoctor = async(req,res) =>{
    const {Did,Hid}= req.params
    try{
        const hospital= await Hospital.findById(Hid)
        await hospital.doctors.pop(Did)
        await Doctor.deleteOne({_id:Did})
        const hospitals = await Hospital.findById(Hid).populate('logs').populate('doctors')
        res.status(200).json(hospitals)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.updateHospital = async(req,res) =>{
    const {Hid} =req.params
    const {name,email,phone,address} = req.body
    try{
        const hospitals = await Hospital.findOneAndUpdate({_id:Hid},{name,email,phone,address})
        hospitals.save()
        const hospital = await Hospital.findById(Hid).populate('logs').populate('doctors')
        res.status(200).json(hospital)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.deleteHospital = async(req,res) =>{
    const {Hid}= req.params
    try{
        await Hospital.deleteOne({_id:Hid})
        res.status(200).json({message:'success'})
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.getAll =async(req,res)=>{
    try {
        const hospitals = await Hospital.find({})
        res.status(200).json(hospitals)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getDoctors=async(req,res)=>{
    const {id}=req.params
    try {
        const hospitals = await Hospital.findById(id).populate('doctors')
        res.status(200).send(hospitals)
        
    } catch (error) {
        res.status(200).send(error)
    }
}



module.exports.bookToken = async(req,res)=>{
    const {hid,pid,did}=req.body
    try {
        const hospital = await Hospital.findById(hid);
        const doctor = await Doctor.findById(did)
        const patient = await Patient.findById(pid)
        doctor.token.push(patient)
        await doctor.save()
        // const newlog = new Logs({doctorId:did,hospitalId:hid,patientId:pid})
        // newlog.save()
        // hospital.logs.push(newlog)
        // patient.logs.push(newlog)
        // await hospital.save()
        // await patient.save()
        res.status(200).send("Token Booked")
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}