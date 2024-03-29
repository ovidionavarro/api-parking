const {response,request}= require('express')
const Sequelize=require('sequelize')
const Op=Sequelize.Op
const { Reserve } = require('../models/reserve')
const {Parking}=require('../models/parking')
const { User } = require('../models/user')
const Logs = require('../models/logs');


const reserveGet= async(req=request,res=response)=>{
    try {
        const ret=await Reserve.findAll()
        res.json({
            ret
        })
    } catch (error) {
        const err= new Logs({level:"error",log:error,date:new Date(),route:"reserve",request:"get"})
        await err.save()
        return res.status(500).json({
            error
        })
    }
}
const reservePost=async(req=request,res=response)=>{
    try {
        const {time_init,time_end,owner,registration_num}=req.body
        //fecha de inicio mayor que finalizacion
        if(time_end<=time_init){
            return res.status(400).json({
                msg:'incorrect date'
            })
        }
        //owner exsita
        const owner_car=await User.findByPk(owner)
        if(owner_car===null ||!owner_car.dataValues.status){
            return res.status(404).json({
                msg:'invalid owner'
            })
        }



        const problemKeys=await Reserve.findOne({where:
            {time_init,time_end,registration_num}
        })
        if(problemKeys){
            return res.status(400).json({
                msg:'duplicate key'
            })
        }
    

        //encontrar instancias de parqueos que cohinciden en horario
        const aux1= await Reserve.findAll({where:{
            time_init:{
                [Op.gte]:time_init
            },
            time_end:{
                [Op.lte]:time_end
            }
        }})
        const aux2=await Reserve.findAll({where:{
            [Op.or]:[
                {
                    time_init:{
                        [Op.lte]:time_init,
                    },
                    time_end:{
                        [Op.gte]:time_init,
                    }
                },
                {
                    time_init:{
                        [Op.lte]:time_end,
                    },
                    time_end:{
                        [Op.gte]:time_end,
                    }
                }
            ]  
        }})
        const aux=[...aux1,...aux2]

        //verificar si existe el mismo carro reservado para esa hora
        let reserved=false
        aux.forEach(element => {
            if(element.dataValues['registration_num']==registration_num){
                reserved=true
            }
        })
        if(reserved){
            return res.status(400).json({
                msg:'vehicle is already reserved'
            })
        }
        //buscando espacios disponibles
        const parking=await Parking.findAll()
        let use_parking={}
        parking.forEach(element => {
            use_parking[element.dataValues['id']]=true
        });
        aux.forEach(element => {
            use_parking[element.dataValues['id_parking']]=false
        });
        //vericar si hay espacio disponible
        console.log('use_parking',use_parking)
        let id_parking=-1
        for (const clave in use_parking) {
            if(use_parking[clave]){
                id_parking=clave;
                break
            }
          }

        console.log('id_parking',id_parking)
        if(id_parking==-1){
            return res.status(400).json({
                msg:"No parking available at that time"
            })
        }



        const ret = new Reserve({id_parking,time_init,time_end,owner,registration_num})
        await ret.save()
        return res.status(201).json({
            ret
        })
    }catch (error) {
        const err= new Logs({level:"error",log:error,date:new Date(),route:"reserve",request:"post"})
        await err.save()
        return res.status(500).json({
            error
        })
    }
}

const reserveDelete=async(req=request,res=response)=>{
    try {
        const {id_parking,time_init,time_end}=req.query
        const parking=await Parking.findByPk(id_parking)
        if(!parking){
            return res.status(404).json({
                msg:'invalid id_parking'
            })
        }
        const result=await Reserve.destroy({where:{id_parking,time_init,time_end}})
        const ret=result!==0
        return res.json({
            ret
        })
    } catch (error) {
        const err= new Logs({level:"error",log:error,date:new Date(),route:"reserve",request:"delete"})
        await err.save()
        return res.status(500).json({
            error
        })
    }
}
const reserveUpdate=async(req=request,res=response)=>{
    try {
        const {id_parking,time_init,time_end}=req.body
        const {registration_num}=req.query
        const reserved=await Reserve.findOne({where:{
            id_parking,
            time_init,
            time_end
        }})
        if(!reserved){
            return res.status(400).json({
                msg:'bad request'
            })
        }  
        const aux1= await Reserve.findAll({where:{
            time_init:{
                [Op.gte]:time_init
            },
            time_end:{
                [Op.lte]:time_end
            }
        }})
        const aux2=await Reserve.findAll({where:{
            [Op.or]:[
                {
                    time_init:{
                        [Op.lte]:time_init,
                    },
                    time_end:{
                        [Op.gte]:time_init,
                    }
                },
                {
                    time_init:{
                        [Op.lte]:time_end,
                    },
                    time_end:{
                        [Op.gte]:time_end,
                    }
                }
            ]  
        }})
        const aux=[...aux1,...aux2]
    
        //verificar si existe el mismo carro reservado para esa hora
        let car_reserved=false
        aux.forEach(element => {
            if(element.dataValues['registration_num']==registration_num){
                car_reserved=true
            }
        })
        if(car_reserved){
            return res.status(404).json({
                msg:'vehicle is already reserved'
            })
        }
        
        const result =await Reserve.update({registration_num},{where:{id_parking,time_init,time_end}})
        const [ok]=result
        const ret=!!ok
        return res.json(ret)

    } catch (error) {
        const err= new Logs({level:"error",log:error,date:new Date(),route:"reserve",request:"update"})
        await err.save()
        return res.status(500).json({
            error
        })
        
    }
}






module.exports={
    reserveGet,
    reservePost,
    reserveDelete,
    reserveUpdate
}
