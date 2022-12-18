const express = require('express')
const {signup,login, getLogs}=require('../controllers/patient')
const router = express.Router()

router.get('/:id',getLogs)
router.post('/signup',signup)
router.post('/login',login)

module.exports=router