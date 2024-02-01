const {Sequelize}= require('sequelize')
 const db=new Sequelize('parking_db',process.env.DATABASE_USER,process.env.DATABASE_PASS,{
    dialect:'mysql',
    host:'localhost',
    logging:false
 })
 module.exports={
    db
 }
