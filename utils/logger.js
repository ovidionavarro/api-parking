const {createLogger,transports,format}=require('winston')
require('winston-mongodb')

const logger=createLogger({
    transports:[
        new transports.MongoDB({
            level:'error',
            db:'mongodb://127.0.0.1:27017/parking',
            options:{
                useUnifiedTopology:true
            },
            collection:'Logs',
            format:format.combine(
                format.timestamp(),
                format.json())
        })
    ]
})


module.exports=logger