const {response,request}= require('express')
const bcryptjs=require('bcryptjs');

const { User } = require('../models/user');
const { generateJWT } = require('../utils/generate-jwt');
const Logs = require('../models/logs');


const login=async(req,res=response)=>{
    const{email,password}=req.body
    //todos son status 400
    try {
        const user= await User.findOne({where:{email}})

        if(!user){
            return res.json({
                msg:' incorrect email '
            })
        }
        if(!user.status){
            return res.json({
                msg:'status false'
            })
        }
        const validPassword=bcryptjs.compareSync(password,user.password_hash)
        if(!validPassword){
            return res.json({
                msg:"invalid password"
            })
        }

        const token=await generateJWT(user.id)

        res.json({
            user,
            token
        })
    } catch (error) {
        const err= new Logs({level:"error",log:error,date:new Date(),route:"logs",request:"get"})
        await err.save()
        return res.status(500).json({
            msg:'internal error'
        })
    }
}


module.exports={
    login
}