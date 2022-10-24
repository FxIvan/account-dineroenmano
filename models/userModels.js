const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user:String,
    password:String,
    telefono:String,
    updated:{type:Date , default:Date.now}
})

const userModel = mongoose.model('userRegister',userSchema)

module.exports = userModel