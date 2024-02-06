const {Router}= require('express')
const { parkingGet, parkingPost, parkingPut, parkingDelete } = require('../controller/parking.controllers')
const {check}=require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')


const router=Router()
router.get('/',parkingGet)
router.post('/',[
    check('description','invalid description').isString(),
    validateFields
],parkingPost)
router.put('/:id',[
    check('description','invalid description').isString(),
    validateFields
],parkingPut)
router.delete('/:id',parkingDelete)


module.exports=router