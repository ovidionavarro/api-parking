const {response,request}= require('express')
const {Parking}=require('../models/parking')


const parkingGet= async(req=request,res=response)=>{
    const parking=await Parking.findAll()
    res.json({
        parking
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

