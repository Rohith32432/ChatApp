const express=require('express')
const { registerUser, loginuser, allUsers } = require('../controllers/useercontroller')
const { protect } = require('../middlewares/authmiddleware')
const router=express.Router()

router.post('/',registerUser)
router.post('/login',loginuser)
router.get('/', protect,allUsers)
module.exports=router