const {Router}= require('express')
const { reserveGet, reservePost } = require('../controller/reserve.controller')



const router=Router()
router.get('/',reserveGet)
router.post('/',reservePost)


module.exports=router