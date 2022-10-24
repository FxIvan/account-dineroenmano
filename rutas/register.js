const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const userForm = require('../models/userModels')


router.route('/')
.post(async(req,res)=>{
    const { user , password , telefono } = req.query

    let saltRounds = 12

    bcrypt.hash(password,saltRounds)
    .then(hashpass=>{
        bcrypt.hash(user,saltRounds)
        .then(hashuser=>{
            const userSchema = new userForm({
                user:hashuser,
                password:hashpass,
                telefono
            })
            console.log(userSchema)
            userSchema.save()
        })
    })
})

router.route('compare')
.post((req,res)=>{
    const {user,password} = req.query

    userForm.find({user}, function(err,docs){
        console.log(docs)
    })
})

module.exports = router