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
        description:{
            type:DataTypes.STRING
        },
        status:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }
        
    },
    {timestamps:false}
)
module.exports={
    Parking
}
