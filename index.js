const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const User = require('./model/user')
const {registerValidation}=require('./validation')

const app = express()
app.use(express.json())

///////////////////////////////////////////////////////
// Register
app.post('/register' , async(req , res)=>{
    // validation
    const{error}=registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // //check if the database is exist
    // const email = await User.findOne({email : req.body.email})
    // if(email){
    //     res.status(400).send('email already exist')
    // }
    // create a new user
    const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        image:req.body.image
    })
    
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err) {
        res.status(200).send(err)
    }
})


app.get('/users',async(req , res)=>{
        const allUsers=await User.find()
        if(allUsers) return res.status(200).send(allUsers)
    })

////////////////////////////////////////////////////
//connsect to DB
mongoose.connect(process.env.DB_Connect, ()=>{
    console.log('connected to db..')
})



// // Import Routes
// const authRoutes = require('./routes/auth')
// // Routes Middleware
// app.use('/api',authRoutes)
// middleware 
const port = 3000 || process.env.PORT


app.listen(port,()=>{
    console.log('listening to port 3000 .......')
})