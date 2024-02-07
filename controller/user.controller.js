const {response,request}= require('express')
const {v4: uuidv4}=require('uuid')
const {User}=require('../models/user')
const bcryptjs=require('bcryptjs');


const userGet= async(req=request,res=response)=>{
    try {
        const users=await User.findAll({where:{status:true}})
        res.json({
            users
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
        
    }
}
const userPost=async(req=request,res=response)=>{
    try {
        const {name,email,password,phone,role}=req.body
        const eq_email=await User.findOne({where:{email}})
        if(eq_email){
            return res.status(400).json({
                msg:'this email already exist'
            })
        }
    
    
        const salt=bcryptjs.genSaltSync()
        const password_hash=bcryptjs.hashSync(password,salt)
        const user_create= new User({id:uuidv4(),name,email,password_hash,phone,role,status:true})
        await user_create.save()
        res.status(201).json({
            user_create
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
        
    }

}
const userDelete=async(req=request,res=response)=>{
    try {
        const {id}=req.params
        const user=await User.findByPk(id)
        
        if(!user){
            return res.status(404).json({
                msg:'user  not found '
            })
        }

        const result=await User.update({status:false},{where:{id}})
        const [ok]=result
        const ret=!!ok
        res.json({
            ret
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}
const userUpdate=async(req=request,res=response)=>{
    try {
        const {id}=req.params
        const user=await User.findByPk(id)
        if(!user){
            return res.status(404).json({
                msg:'user not found'
            })
        }
        const {name,phone,role}=req.body



        const result=await User.update({name,phone,role},{where:{id}})
        const [ok]=result
        const ret=!!ok
        res.json({
            ret
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }

    
}




module.exports={
    userGet,
    userPost,
    userDelete,
    userUpdate
}

