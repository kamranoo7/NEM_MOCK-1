let express=require("express")
const { connection } = require("./db")
const { userRouter } = require("./Routes/user.routes")
const { dashboardRouter } = require("./Routes/dashboard.route")
let cors=require("cors")
const { auth } = require("./Middleware/auth.middleware")

let app=express()
require("dotenv").config()
app.use(cors())
app.use(express.json())

app.use("/signup",userRouter)
app.use(auth)
app.use("/employees",dashboardRouter)
app.listen(process.env.port,async()=>{
   try{
await connection
console.log("connected to db")
   }catch(err){
    console.log(err)
    console.log("Not Connected to Db")
   }
   console.log("server is running")
})