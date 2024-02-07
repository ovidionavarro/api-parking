const jwt=require('jsonwebtoken')


const generateJWT=(uuid='')=>{
    return new Promise((resolve,reject)=>{

        const payload={uuid}
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject("Unable to generate the token")
            }else{
                resolve(token);
            }
        }
        )

    })

}
module.exports={
    generateJWT
}