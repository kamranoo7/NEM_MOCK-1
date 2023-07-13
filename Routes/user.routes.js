let express=require("express")
const { UserModel } = require("../Model/user.model")
const { model } = require("mongoose")
let userRouter=express.Router()
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
userRouter.post("/register",(req,res)=>{
let {email,password,confirmPassword}=req.body
try{
bcrypt.hash(password,5,async(err,hash)=>{
    if(err){
        res.status(200).json({error:err.message})
    }else{
        let user=new UserModel({email,password:hash,confirmPassword:hash})
        await user.save()
    }
})
res.status(200).json({msg:"New user has been Registered"})
}catch(err){
    res.status(400).json({error:err.message})
}
})


userRouter.post("/login",async(req,res)=>{
let {email,password}=req.body
try{
    let user=await UserModel.findOne({email})
   if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                let token=jwt.sign({course:"backend"},"masai")
                res.status(200).json({msg:"Login Successfully","token":token})
            }else{
                res.status(200).json({msg:"Wrong Credential"})
            }
        })
    }else{
        res.status(400).json({msg:"User not Found"})
    }

}catch(err){
    res.status(400).json({error:err.message})
}
})
module.exports={
    userRouter
}