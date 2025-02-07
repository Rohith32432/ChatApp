const express=require('express')
const { protect } = require('../middlewares/authmiddleware')
const { sendmessage, getallMsg, gemminibot } = require('../controllers/messageController')
const router= express.Router()

router.route('/').post(protect,sendmessage)
router.get('/:chatId',protect,getallMsg)
router.post('/bot',protect,gemminibot)

module.exports=router 