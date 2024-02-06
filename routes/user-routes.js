const {Router}= require('express')
const { userGet,userPost, userDelete, userUpdate } = require('../controller/user.controller')
const {check}=require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')

const router=Router()
router.get('/',userGet)

router.post('/',[
    check('name','Name is not null').isString().notEmpty(),
    check('email','the email is not valid').isEmail(),
    check('password','The password must have more than 6 characters').isString().isLength({min:6}),
    check('phone','phone error').isNumeric().isLength({min:8}),
    check('role','this role is not valid').isIn(['ADMIN','CLIENT','EMPLOY']),
    validateFields
],userPost)

router.delete('/:id',userDelete)

router.put('/:id',userUpdate)


module.exports=router