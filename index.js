let exp = require("express")

let app=exp();

let path = require("path")

require("dotenv").config()

let mongoose = require("mongoose")

app.use(exp.static(path.join(__dirname, './dist/meanapp')))

const databaseConnectUrl = process.env.DATABASE_URL

const userApp = require("./MODELS/userapp")
app.use("/user",userApp)

mongoose.connect(databaseConnectUrl)
.then(()=>{console.log("connected to db")})
.catch(err=>{console.log("err in connection",err)})


app.get('*', (rq, res)=>{

    res.sendFile(path.join(__dirname,'./dist/meanapp/index.html'))
})





let port = process.env.PORT

app.listen(port, ()=>{console.log(`port is listening ${port}`)})