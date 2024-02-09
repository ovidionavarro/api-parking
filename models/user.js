const {v4: uuidv4}=require('uuid')
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
            allowNull:false,
            unique:true
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
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    },
    {
        hooks:{
            afterSync: async()=>{
            const count=await User.count()
            if(count===0){
                console.log(count)
                await User.create(
                    {id:uuidv4(),
                    name:"ovidio2",
                    email:"ovidio2@gmail.com",
                    password_hash:"$2a$10$DDnpivOVGNc8v0jSdPlHA.qjmofJFy2f/UrgukNGhoDsln2VNP2om",
                    phone:"55555555",
                    role:"ADMIN"
                    ,status:true}) 
                }
            }
        },
        timestamps:false}
)
module.exports={
    User
}