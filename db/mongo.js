const mongoose=require('mongoose')

mongoConnect=async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/parking_logs')
        console.log('mongo connect')
    }
    catch(err){
        throw new Error(err)
    }
}
module.exports={
    mongoConnect
}