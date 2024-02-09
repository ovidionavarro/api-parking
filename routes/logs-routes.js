const {Router}= require('express')
const { logger } = require('../controller/logs.controllers')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')
const { haveRole } = require('../middlewares/validate-roles')


const router=Router()
router.get('/',[
    validateJWT,
    haveRole('ADMIN'),
    validateFields
],logger)

module.exports=router