const express = require('express')
const { signUp, login, addDoctor } = require('../controllers/hospital')
const router = express.Router()

router.post('/signup',signUp)
router.post('/login',login)
router.post('/add/doctor/:id',addDoctor)

module.exports=router