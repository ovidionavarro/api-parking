const {response,request}= require('express')
const {Parking}=require('../models/parking')
const { Reserve } = require('../models/reserve')
const Sequelize=require('sequelize')
const Op=Sequelize.Op

const parkingGet= async(req=request,res=response)=>{
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

}
const parkingPost=async(req=request,res=response)=>{
    const {description}=req.body
    
    const parking= new Parking({description})
    await parking.save()
    res.status(201).json({
        parking
    })

}





module.exports={
    parkingGet,
    parkingPost
    
}

