let express=require("express")
const { DashboardModel } = require("../Model/dashboard.model")
let dashboardRouter=express.Router()


//Create
dashboardRouter.post("/create",async(req,res)=>{
    let payload=req.body
    try{
let data=new DashboardModel(payload)
await data.save()
res.status(200).json({msg:"New Data has been Added"})
    }catch(err){
res.status(400).json({error:err.message})
    }
})
//Get
dashboardRouter.get("/",async(req,res)=>{
    try{
let data=await DashboardModel.find()
res.send(data)
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

//Update
dashboardRouter.patch("/update/:postID",async(req,res)=>{
    let {postID}=req.params
    let post=await DashboardModel.findOne({_id:postID})
    try{
if(req.body.authorID!==post.authorID){
    res.status(200).json({msg:"You are not Authorised"})
}else{
    await DashboardModel.findByIdAndUpdate({_id:postID},req.body)
    res.status(200).json({msg:"The Data has been Updated"})
}
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
})
//Delete
dashboardRouter.delete("/delete/:postID",async(req,res)=>{
    let {postID}=req.params
    let post=await DashboardModel.findOne({_id:postID})
    try{
if(req.body.authorID!==post.authorID){
    res.status(200).json({msg:"You are not Authorised"})
}else{
    await DashboardModel.findByIdAndDelete({_id:postID})
    res.status(200).json({msg:"The Data has been deleted"})
}
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
})

module.exports={
    dashboardRouter
}