const mongoose=require('mongoose')


//const dbMongo = () => {
//    return new Promise((resolve, reject) => {
//        mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
//        
//        const db = mongoose.connection;
//        
//        db.on('error', (error) => {
//            console.error('Error de conexión:', error);
//            reject(error);
//        });
//        
//        db.once('open', () => {
//            console.log('Conexión establecida por cafe');
//            resolve();
//        });
//    });
//};
dbMongo=async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ParkingLogs')
        console.log('connect ParkingLogs ');
        
    } catch (error) {
        console.log(error);
        throw new Error('connection error')
    }
}

        
        
module.exports={
    dbMongo
} 