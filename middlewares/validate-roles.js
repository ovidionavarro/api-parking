const { request, response } = require("express")


const haveRole=(...roles)=>{
    return(req,res=response,next)=>{
        console.log(roles)
        console.log(req.user.role)
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg:'invalid role'
            })
        }
        next()
    }
}
module.exports={
    haveRole
}