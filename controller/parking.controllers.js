const {response,request}= require('express')
const {Parking}=require('../models/parking')
const { Reserve } = require('../models/reserve')
const Sequelize=require('sequelize')
const Op=Sequelize.Op

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
        return res.json({
            error
          })
    }

}
const parkingPost=async(req=request,res=response)=>{
    try {
        const {description}=req.body
        if(description===""){
            return res.json({
                msg:"non-empty description "
            })
        }

        const parking= new Parking({description})
        await parking.save()
        res.status(201).json({
            parking
        })

        
    } catch (error) {
        return res.json({
            error
        })
    }
}
const parkingPut=async(req=request,res=response)=>{
    try {
        const {id}=req.params
        const parking=await Parking.findByPk(id)
        console.log(parking.dataValues)
        if(!parking){
            return res.json({
                msg:'bad request'
            })
        }
        const {description}=req.body
        const result=await Parking.update({description},{where:{id}})
        res.json({
            result
        })
    } catch (error) {
        return res.json({
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
            return res.json({
                elem
            })
        }
        return res.json({
            idInReserved
        })
    } catch (error) {
        return res.json({
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

