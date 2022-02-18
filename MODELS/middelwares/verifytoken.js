const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyToken = (req, res, next)=>{

    console.log(req.headers)

    let bearertoken = req.headers.authorization;

    if (bearertoken == undefined) {
        res.status(200).send({message:"unauthorised request"})
    }
    let token = bearertoken.split(" ")[1]

    console.log(token)

   try{
    jwt.verify(token, process.env.SECRET_KEY)

    next()
   }
   catch{
       res.send({message:"session expired .. relogin again"})
   }

}

module.exports = verifyToken