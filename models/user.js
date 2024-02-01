
const{DataTypes}= require('sequelize')
const{db}=require('../db/mysql.js')

const User=db.define(
    'User',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        email:{
            type:DataTypes.STRING(),
            allowNull:false,
            unique:true
        },
        password_hash:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type:DataTypes.INTEGER
        },
        role:{
            type:DataTypes.ENUM('ADMIN','CLIENT','EMPLOY'),
            allowNull:false
        }
    },
    {timestamps:false}
)
module.exports={
    User
}