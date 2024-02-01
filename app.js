require('dotenv').config()
const express =require('express')
const cors =require('cors')
const {v4:uuidv4}=require('uuid')


const { mysqlConnect } = require('./db/init_mysql')
const { mongoConnect } = require('./db/mongo')

const app=express()
const port=process.env.PORT

//databases
mysqlConnect({alter:false})
mongoConnect()

//middlewares
app.use(cors())
app.use(express.json());

//test
app.get('/',(req,res)=>{
    res.send('hi')
})
console.log(typeof(uuidv4()))

//listen
app.listen(port,console.log(`server running on ${port} `))