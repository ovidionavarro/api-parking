const {Router}= require('express')
const { userGet,userPost, userDelete, userUpdate } = require('../controller/user.controller')


const router=Router()
router.get('/',userGet)
router.post('/',userPost)
router.delete('/:id',userDelete)
router.put('/:id',userUpdate)


module.exports=router