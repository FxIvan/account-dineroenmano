const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const userForm = require('../models/userModels')
const jwt = require('jsonwebtoken')

require('dotenv').config()


router.route('/')
.post(async(req,res)=>{
    const { user , password , telefono } = req.query

    let saltRounds = 12

    bcrypt.hash(password,saltRounds)
    .then(hashpass=>{
        //bcrypt.hash(user,saltRounds)
        //.then(hashuser=>{
            const userSchema = new userForm({
                user:user,
                password:hashpass,
                telefono
            })
            
            userSchema.save()
        //})
    })


})

router.route('compare')
.post((req,res)=>{
    const {user,password} = req.query

    userForm.find({user}, function(err,docs){
        console.log(docs)
    })
})


router.route('/login')
.post(async(req,res)=>{

    const user = await userForm.findOne({user:req.query.user})
    if(!user) return res.status(400).json({error: 'Error en el usuario o contraseña'})

    /*const validPassword = */bcrypt.compare(req.query.password, user.password, function(err,result){
        if(!result){
            res.status(400).json({error : "Contraseña Invalida"})
            console.log("Contraseña invalida: ", result)
        }

        if(result){
        const token = jwt.sign({
            name:user.name,
            id:user._id
        },process.env.TOKEN_SECRET)

        res.header('auth-token',token).json({
            error:null,
            data:{token},
            message:'Bievenido'
        })
        }
    })
/*
    if(!validPassword) return res.status(400).json({error: 'Contraseña Invalida'})

    const token = jwt.sign({
        name:user.name,
        id:user._id
    },process.env.TOKEN_SECRET)

    res.header('auth-token',token).json({
        error:null,
        data:{token},
        message:'Bievenido'
    })
*/
})

module.exports = router