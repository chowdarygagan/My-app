const exp = require("express")
const userApp = exp.Router()
const jwt = require("jsonwebtoken")
const verifytoken = require("./middelwares/verifytoken")
require("dotenv").config()
var cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const multer = require('multer')

const expressAsyncHandler = require("express-async-handler")
const user = require("../MODELS/user")
const task = require("../MODELS/task")
const bcryptjs = require("bcryptjs")
const verifyToken = require("./middelwares/verifytoken")
userApp.use(exp.json())

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const cloudinaryStorage=new CloudinaryStorage({
    cloudinary: cloudinary,
  
      params: async (req, file) => {
          return {
              folder:"MyFolder",
              public_id:file.fieldname+'-'+Date.now()
          }
      }
    
  });

  const upload = multer({storage:cloudinaryStorage})





userApp.post("/createuser",upload.single('photo'),expressAsyncHandler(async (req, res) => {


    let imgCdn = req.file.path

    let newUser = JSON.parse(req.body.userObj);

   

    let userObjFromD = await user.findOne({username:newUser.username})

    if(userObjFromD != null){

        res.send({message:"user already exist"})
    }
    else{

        newUser.profileImage = imgCdn

        let hasedpw = await bcryptjs.hash(newUser.password, 5)

        newUser.password=hasedpw;

        console.log(newUser.password)
    
        let userDoc = new user({...newUser})
       let userObj= await userDoc.save()
    
        res.send({Message:"user created", payload:userObj})
    

    }


    

}))
userApp.post("/addtask",verifytoken,expressAsyncHandler(async (req, res, next)=>{

    newTask = req.body
    let taskFromDb = await task.findOne({addtask:newTask.addtask})

        let taskDoc = new task({...newTask})
        let taskObj = await taskDoc.save()

        res.send({message:"task added ", payload:taskObj})
  


}))

userApp.post("/login", expressAsyncHandler(async (req, res)=>{
    let userFromCred = req.body

    let userFromDb = await user.findOne({username:userFromCred.username})
    

    if(userFromDb == null){

        res.status(200).send({message:"invalid username"})

    }
    else{

        let status = await bcryptjs.compare(userFromCred.password, userFromDb.password)

        if(status == false){
            res.status(200).send({message:"invalid password "})
        }
        else{
            let signedToken = await jwt.sign({username:userFromDb.username}, process.env.SECRET_KEY,{expiresIn:100})

            res.status(200).send({message:"login success", token:signedToken, person:userFromDb})
        }

    }
}))



userApp.get("/getuser/:username", expressAsyncHandler(async (req,res)=>{

    let userName = req.params.username

    let users1 = await user.findOne({username:userName}).exec()

    // console.log(userName)
    if(users1 == null){
        res.status(404).send({message:"user not found"})
    }
    else{
        res.status(200).send({message:"user data",payload:users1})
    }

   
}))

userApp.get("/getuser/:id",expressAsyncHandler(async(req,res)=>{

 

}))

userApp.put("/updateuser", expressAsyncHandler(async (req, res)=>{

    let userFromClient = req.body

    await user.findOneAndUpdate({username:userFromClient.username},{$set:{...userFromClient}})

    
    res.status(200).send({message:"user updated"})

}))



userApp.get("/addtask",verifytoken,expressAsyncHandler((req, res, next)=>{

    res.send({message:"all tasks "})

}))

userApp.put("/deleteuser", expressAsyncHandler(async (req, res)=>{

    let userFromClient = req.body

    await user.findOneAndUpdate({username:userFromClient.username},{$set:{status:userFromClient.status}})

    res.status(200).send({message:"user deleted"})


}))

userApp.use((req,res,next)=>{

    res.send({message:`${req.url} not found`})

})
   

userApp.use((err,req,res,next)=>{

    res.send({Message:"error", payload: err.Message})
})








module.exports = userApp



