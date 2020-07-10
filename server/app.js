const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const corse = require("cors")
const jwt = require("jsonwebtoken")

const app = express()


app.use(corse())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.use("*",(req, res, next)=> {
    let token = req.headers.token
    jwt.verify( token, config.get("jwtSecret"), (err, decoded) =>{
        if (!err)
            req.user = decoded
        next()
    })
} )

app.use('/uploads', express.static("uploads"))
app.use("/api/auth", require("./routes/auth.routes"))

app.use("/api", require("./routes/api.upload"))



const PORT = config.get("port")

async function start(){
    try{
        await mongoose.connect(config.get("mongoUri"),{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
        app.listen(PORT, () => console.log(`Start on port ${PORT}`))
    }catch (e) {
        console.log("Error", e.message)
    }
}

start();



