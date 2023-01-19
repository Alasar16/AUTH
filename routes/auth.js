const router =require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {registerValidation}=require('../validation')

// Register
router.post('/register' , async(req , res)=>{
    // validation
    const{error}=registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //check if the database is exist
    const email = await User.findOne({email : req.body.email})
    if(email){
        res.status(400).send('email already exist')
    }

    // Hash the password
    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password , salt)

    // create a new user
    const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : hashedPassword
    })
    
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err) {
        res.status(200).send(err)
    }
})


// // login
// router.post('/login',async(req,res)=>{
//      // validation
//     const{error}=loginValidation(req.body)
//     if(error) return res.status(400).send(error.details[0].message)

//      //check if the database is exist
//     const user = await User.findOne({email : req.body.email})
//     if(!user){
//         res.status(400).send('email or password is wrong')
//     }
//     //password is correct
//     const invalidpass = await bcrypt.compare(req.body.password,user.password)
//     if(!invalidpass){
//         res.status(400).send('Invalid Password')
//     }

//     // create and asign token
//     const token=jwt.sign({_id:user._id},process.env.SEKRET_KEY)
//     res.header( 'auth-token',token).send(token)
    



// })


module.exports=router
