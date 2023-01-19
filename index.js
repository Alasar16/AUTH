const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())
//connsect to DB
mongoose.connect(process.env.DB_Connect, ()=>{
    console.log('connected to db..')
})

// Import Routes
const authRoutes = require('./routes/auth')
const postRoutes= require('./routes/posts')
// Routes Middleware
app.use('/api/user',authRoutes)
app.use('/api/posts',postRoutes)
// middleware 



app.listen(process.env.port||3000,()=>{
    console.log('listening to port 3000 .......')
})