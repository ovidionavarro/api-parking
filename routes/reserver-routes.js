const {Router}= require('express')
const { reserveGet, reservePost, reserveDelete, reserveUpdate } = require('../controller/reserve.controller')
const {check}=require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')
const { haveRole } = require('../middlewares/validate-roles')

const router=Router()
router.get('/',[
    validateJWT,
    haveRole('ADMIN','EMPLOY'),
    validateFields
],reserveGet)

router.post('/',[
    validateJWT,
    haveRole('ADMIN','EMPLOY','CLIENT'),
    check('time_init','Invalid time_init').isISO8601(),
    check('time_end','Invalid time_end').isISO8601(),
    check('owner','Invalid owner').isUUID(),
    check('registration_num','Invalid registration_num').isString().isLength({max:8}),
    validateFields
],reservePost)
router.delete('/',[
    validateJWT,
    haveRole('ADMIN','EMPLOY'),
    check('id_parking','invalid_parking').isInt(),
    check('time_init','Invalid time_init').isISO8601(),
    check('time_end','Invalid time_end').isISO8601(),
    validateFields
],reserveDelete)
router.put('/',[
    validateJWT,
    haveRole('ADMIN','EMPLOY'),
    check('id_parking','invalid_parking').isInt(),
    check('time_init','Invalid time_init').isISO8601(),
    check('time_end','Invalid time_end').isISO8601(),
    check('registration_num','Invalid registration num').isString().isLength({max:8}),
    validateFields
],reserveUpdate)

module.exports=router