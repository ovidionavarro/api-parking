const {response,request}= require('express')
const Sequelize=require('sequelize')
const Op=Sequelize.Op

const {Parking}=require('../models/parking')
const { Reserve } = require('../models/reserve')
const Logs = require('../models/logs');


const parkingGet= async(req=request,res=response)=>{
    try {
            const date=new Date()
        const reserved= await Reserve.findAll({where:{
            time_init:{
                [Op.lte]:date,
            },
            time_end:{
                [Op.gte]:date,
            }
        }})
        const parking=await Parking.findAll()
        //diccionarios con parqueos disponibles
        let status_parking_now={}
        parking.forEach(element => {
            status_parking_now[element.dataValues['id']]=true
        });
        reserved.forEach(element => {
            status_parking_now[element.dataValues['id_parking']]=false
        });
        res.json({
            status_parking_now
        })
    } catch (error) {
        const err= new Logs({level:"error",log:error,date:new Date(),route:"parking",request:"get"})
        await err.save()
        return res.status(500).json({
            error
          })
    }

}
const parkingPost=async(req=request,res=response)=>{
    try {
        const {description}=req.body
        if(description===""){
            return res.status(400).json({
                msg:"non-empty description "
            })
        }

        const parking= new Parking({description})
        await parking.save()
        res.status(201).json({
            parking
        })

        
    } catch (error) {
        const err= new Logs({level:"error",log:error,date:new Date(),route:"parking",request:"post"})
        await err.save()
        return res.status(500).json({
            error
        })
    }
}
const parkingPut=async(req=request,res=response)=>{
    try {
        const {id}=req.params
        const parking=await Parking.findByPk(id)
        if(!parking){
            return res.status(400).json({
                msg:'bad request'
            })
        }
        const {description}=req.body
        const result=await Parking.update({description},{where:{id}})
        const[ok]=result
        const ret=!!ok
        res.json({
            ret
        })
    } catch (error) {
        const err= new Logs({level:"error",log:error,date:new Date(),route:"parking",request:"update"})
        await err.save()
        return res.status(500).json({
            error
        })
    }

}
const parkingDelete=async(req=request,res=response)=>{
    try {
        const{id}=req.params
        const idInReserved=await Reserve.findAll({where:{id_parking:id}})
        const length=idInReserved.length
        if(length==0){
            const elem=await Parking.destroy({where:{id}})
            const ret=elem!==0
            return res.json({
                ret
            })
        }
        return res.json({
            msg:'parking reserved'
        })
    } catch (error) {
        const err= new Logs({level:"error",log:error,date:new Date(),route:"parking",request:"delete"})
        await err.save()
        return res.status(500).json({
            error
        })
    }
}


module.exports={
    parkingGet,
    parkingPost,
    parkingPut,
    parkingDelete
    
}

