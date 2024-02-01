const{DataTypes}= require('sequelize')
const{db}=require('../db/mysql.js')

const Parking=db.define(
    'Parking',
    {
        id:{
            type:DataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        status:{
           type:DataTypes.BOOLEAN,
           allowNull:false 
        }
        
    })