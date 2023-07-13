let mongoose=require("mongoose")
let dashboardSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    department:String,
    salary:Number
})

let DashboardModel=mongoose.model("data",dashboardSchema)
module.exports={
    DashboardModel
}