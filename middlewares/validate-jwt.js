const { response, request } = require('express')
const jwt= require('jsonwebtoken')
const {User}=require('../models/user')
const Logs=require('../models/logs')

const validateJWT=async(req=request,res=response,next)=>{
    const token = req.header('x-token')
    console.log(token)
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
        console.log(user)
        //buscar usuario en el delete atrasves del req
        //verificar su user de id tiene estado en true 
        next()
    } catch (error) {
        const err= new Logs({level:"error",log:error,date:new Date(),route:"logs",request:"get"})
        await err.save()
        return res.status(401).json({
            msg:"Invalid Token"
        })
    }
}
module.exports={
    validateJWT
}