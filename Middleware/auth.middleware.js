
let jwt=require("jsonwebtoken")

let auth=(req,res,next)=>{
let token=req.headers.authorization?.split(" ")[1]
if(token){
    try{
        let decoded=jwt.verify(token,"masai")
        if(decoded){
            next()
        }else{
            res.status(200).json({msg:"Token not recognised"})
        }
        
    }catch(err){
    res.status(400).json({error:err.message})
    }
}else{
    res.status(400).json({msg:"Please Login First"})
}

}
module.exports={
    auth
}
