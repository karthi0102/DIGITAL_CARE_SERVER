const express = require('express')
const { signUp, login, addDoctor,getAll,getDoctors } = require('../controllers/hospital')
const router = express.Router()
router.get('/',getAll)
router.get('/:id',getDoctors)
router.post('/signup',signUp)
router.post('/login',login)
router.post('/add/doctor/:id',addDoctor)

module.exports=router