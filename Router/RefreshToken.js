const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')
dotEnv.config()

function RefreshToken(req,res,next){
    const RefreshToken = req.header('RefreshToken');
    if(!RefreshToken) return res.status(401).send("Access Denied")
   
    try{
        jwt.verify(RefreshToken, process.env.RefreshToken,(err, decoded)=>{
            if(err) return status(400).send('invalid Client')
            else{
                req.decoded = decoded
                next()
            }
        })
        
    }catch(err){
        res.send('invalid token')
    }


}

module.exports = RefreshToken;