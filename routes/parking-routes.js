const {Router}= require('express')
const { parkingGet, parkingPost } = require('../controller/parking.controllers')



const router=Router()
router.get('/',parkingGet)
router.post('/',parkingPost)


module.exports=router