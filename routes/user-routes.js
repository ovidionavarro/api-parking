const {Router}= require('express')
const {check}=require('express-validator')

const { userGet,userPost, userDelete, userUpdate } = require('../controller/user.controller')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')
const { haveRole } = require('../middlewares/validate-roles')

const router=Router()
router.get('/',[
    validateJWT,
    haveRole('ADMIN','EMPLOY'),
    validateFields
],userGet)

router.post('/',[
    validateJWT,
    haveRole('ADMIN','EMPLOY'),
    check('name','Name is not null').isString().notEmpty(),
    check('email','the email is not valid').isEmail(),
    check('password','The password must have more than 6 characters').isString().isLength({min:6}),
    check('phone','phone error').isNumeric().isLength({min:8}),
    check('role','this role is not valid').isIn(['ADMIN','CLIENT','EMPLOY']),
    validateFields
],userPost)

router.delete('/:id',[
    validateJWT,
    haveRole('ADMIN'),
    validateFields
],userDelete)

router.put('/:id',[
    validateJWT,
    haveRole('ADMIN'),
    check('name','Name is not null').isString().notEmpty(),
    check('phone','phone error').isNumeric().isLength({min:8}),
    check('role','this role is not valid').isIn(['ADMIN','CLIENT','EMPLOY']),
    validateFields
],userUpdate)


module.exports=router