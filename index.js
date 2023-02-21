const express = require('express')
const mySql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())




////////////////////////////////////////////////////
//connsect to DB




// Import Routes
const authRoutes = require('./routes/auth')
// Routes Middleware
app.use('/',authRoutes)
// middleware 
const port = 3000 || process.env.PORT


app.listen(port,()=>{
    console.log('listening to port 3000 .......')
})