const {Router}= require('express')
const { parkingGet, parkingPost } = require('../controller/parking.controllers')
const {check}=require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')


const router=Router()
router.get('/',parkingGet)
router.post('/',[
    check('description','invalid description').isString(),
    validateFields
],parkingPost)


module.exports=router