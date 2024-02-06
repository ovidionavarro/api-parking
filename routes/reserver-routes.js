const {Router}= require('express')
const { reserveGet, reservePost } = require('../controller/reserve.controller')
const {check}=require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')


const router=Router()
router.get('/',reserveGet)
router.post('/',[
    check('time_init','Invalid time_init').isISO8601(),
    check('time_end','Invalid time_end').isISO8601(),
    check('owner','Invalid owner').isUUID(),
    check('registration_num','Invalid registration_num').isString().isLength({max:8}),
    validateFields
],reservePost)


module.exports=router