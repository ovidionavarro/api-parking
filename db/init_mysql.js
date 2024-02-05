const {db}=require('./mysql.js')
const {User}=require('../models/user.js')
const {Parking}=require('../models/parking')
const {Reserve}=require('../models/reserve.js')
const mysqlConnect=({alter})=>{
    db.authenticate()
        .then(()=>console.log('db sql ok'))
        .catch((err)=>{
            throw new Error(err)
        })
    db.sync({alter})
        .then(()=>console.log('db sql sync ok'))
        .catch((err)=>{
            throw new Error(err)
        })    
 }
module.exports={
    mysqlConnect
}