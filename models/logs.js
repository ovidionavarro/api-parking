const{Schema,model} =require('mongoose');
const { DATE } = require('sequelize');

const logSchema=Schema({
    level:{
        type:String,
        default:'error'
    },
    log:{
        type:String,
        
    },
    date:{
        type:Date,
        default: new DATE()
    },
    route:{
        type:String
    },
    request:{
        type:String,
    }  
});



module.exports=model('Logs',logSchema);