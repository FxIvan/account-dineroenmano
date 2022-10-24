const mongoose = require('mongoose')
require('dotenv').config()
//const MONGO_URL = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@dbprogramas.om4w0.mongodb.net/?retryWrites=true&w=majority` 

const MONGO_URL = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.NAME_DB}.om4w0.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("Conectado a MONGO DB")
})
.catch(err=>{
    console.log("Error de conexion: ", err)
})