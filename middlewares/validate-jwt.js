const { response, request } = require('express')
const jwt= require('jsonwebtoken')
const {User}=require('../models/user')
const logger = require('../utils/logger')

const validateJWT=async(req=request,res=response,next)=>{
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg:"The token does not exist"
        })
    }
    try {
        const {uuid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        console.log(uuid)
        //1leer usuario y guardar en req,hacerlo en 2 lineas
        const user=await User.findOne({where:{id:uuid}})
        //ver si el usuario existe
        if(!user){
            return res.status(401).json({
                msg:"Invalid uuid"
            })
        }
        if(!user.status){
            return res.status(401).json({
                msg:"status false"
            })
        }
        req.user=user
        //buscar usuario en el delete atrasves del req
        //verificar su user de id tiene estado en true 
        next()
    } catch (error) {
        logger.error(error)
        return res.status(401).json({
            msg:"Invalid Token"
        })
    }
}
module.exports={
    validateJWT
}