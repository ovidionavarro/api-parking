require('dotenv').config()
const express =require('express')
const cors =require('cors')


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

//routes
app.use('/user',require('./routes/user-routes.js'))
app.use('/parking',require('./routes/parking-routes'))
app.use('/reserve',require('./routes/reserver-routes.js'))
app.use('/auth',require('./routes/auth-routes.js'))

//listen
app.listen(port,console.log(`server running on ${port} `))
console.log('quitarle unique a name_user')
console.log("verificar si existe owner en reserved")
//realizar curd de reservar y de parking 
//validar rutas
//login con jwt