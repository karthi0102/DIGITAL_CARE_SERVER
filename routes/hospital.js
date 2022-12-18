const express = require('express')
const { signUp, login, addDoctor,updateDoctor,MakeAvailable } = require('../controllers/hospital')
const router = express.Router()

router.post('/signup',signUp)
router.post('/login',login)
router.post('/add/doctor/:id',addDoctor)
router.post('/edit/:Did/:Hid',updateDoctor)
router.post('/avail/:Did/:Hid',MakeAvailable)

module.exports=router