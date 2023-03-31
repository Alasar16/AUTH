const express = require('express')
const mysql = require('mysql')
const {categoriesValidation}=require('./validation')
const dotenv = require('dotenv')
dotenv.config()






////////////////////////////////////////////////////
//connect to DB


const db = mysql.createConnection({
    host:process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const app = express()

app.use(express.json())

app.get('/categories',(req,res)=>{
    const q = 'SELECT * FROM `categories`'
    db.query(q,(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
})

app.post('/categories',(req,res)=>{
    //validation

    const{error}=categoriesValidation(req.body)
        if(error) return res.status(400).send(error.message)
        

    //new user
    const{image ,swappedNumber ,title}=req.body

    const q ='INSERT INTO categories (image ,swappedNumber ,title) VALUES (?,?,?)'
    db.query(q,[image ,swappedNumber , title],(err,data)=>{

        if(err) return res.json({msg:'db error'})

        if(data){
            const newQ = 'SELECT * FROM `categories` where id=?'
    db.query(newQ,[data.insertId],(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
        }
    })
})

// middleware 
const port = process.env.PORT || 3000


app.listen(port,()=>{
    console.log('listening to port 3000 .......')
})