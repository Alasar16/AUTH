const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())




////////////////////////////////////////////////////
//connsect to DB
mongoose.connect(process.env.DB_Connect, ()=>{
    console.log('connected to db..')
})



// Import Routes
const authRoutes = require('./routes/auth')
// Routes Middleware
app.use('/',authRoutes)
// middleware 
const port = 3000 || process.env.PORT


app.listen(port,()=>{
    console.log('listening to port 3000 .......')
})