const {Router}= require('express')
const {check}=require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { login } = require('../controller/auth.controllers')


const router=Router()
router.post('/login',[
    check('email','invalid email').isEmail(),
    check('password','invalid password').isString().isLength({min:6}),
    validateFields
],login)


module.exports=router