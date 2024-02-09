const {Router}= require('express')
const {check}=require('express-validator')

const { parkingGet, parkingPost, parkingPut, parkingDelete } = require('../controller/parking.controllers')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')
const { haveRole } = require('../middlewares/validate-roles')

const router=Router()
router.get('/',[
    validateJWT,
    haveRole('ADMIN','EMPLOY'),
    validateFields
],parkingGet)
router.post('/',[
    validateJWT,
    haveRole('ADMIN','EMPLOY'),
    check('description','invalid description').isString(),
    validateFields
],parkingPost)
router.put('/:id',[
    validateJWT,
    haveRole('ADMIN'),
    check('description','invalid description').isString(),
    validateFields
],parkingPut)
router.delete('/:id',[
    validateJWT,
    haveRole('ADMIN'),
    validateFields
],parkingDelete)


module.exports=router