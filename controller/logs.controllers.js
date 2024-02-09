const { response,request } = require('express');

const Logs = require('../models/logs');

const logger= async(req=request,res=response)=>{ 
    //const error= new Logs({level:"error",error:"404",date:new Date(),route:"logs",request:"post"})
    //await error.save()
    const ret= await Logs.find()
    res.json({
        ret
    })
}
module.exports={
    logger
}