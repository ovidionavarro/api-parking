const {response,request}= require('express')
const {v4: uuidv4}=require('uuid')
const {User}=require('../models/user')
const bcryptjs=require('bcryptjs');


const userGet= async(req=request,res=response)=>{
    const users=await User.findAll({where:{status:true}})
    res.json({
        users
    })
}
const userPost=async(req=request,res=response)=>{
    const {name,email,password,phone,role}=req.body
    const salt=bcryptjs.genSaltSync()
    const password_hash=bcryptjs.hashSync(password,salt)
    const user_create= new User({id:uuidv4(),name,email,password_hash,phone,role,status:true})
    await user_create.save()
    res.status(201).json({
        user_create
    })

}
const userDelete=async(req=request,res=response)=>{
    const {id}=req.params
    const user=await User.findByPk(id)
    console.log(user)
    if(!user){
        return res.json({
            msg:'bad request'
        })
    }
    
    const result=await User.update({status:false},{where:{id}})
    res.json({
        result
    })
}
const userUpdate=async(req=request,res=response)=>{
    const {id}=req.params
    const user=await User.findByPk(id)
    console.log(user)
    if(!user){
        return res.json({
            msg:'bad request'
        })
    }
    const body=req.body
    const result=await User.update(body,{where:{id}})
    res.json({
        result
    })

    
}




module.exports={
    userGet,
    userPost,
    userDelete,
    userUpdate
}

