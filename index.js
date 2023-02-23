const express = require('express')
const mysql = require('mysql')
const bcrypt=require('bcrypt')
const {registerValidation}=require('./validation')
const dotenv = require('dotenv')
dotenv.config()






////////////////////////////////////////////////////
//connsect to DB


const db = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const app = express()

app.use(express.json())
app.get('/registration',(req,res)=>{
    const q = 'SELECT * FROM `registration`'
    db.query(q,(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
})

app.post('/registration',async(req,res)=>{
    //validation

    const{error}=registerValidation(req.body)
        if(error) return res.status(400).send(error.message)

    //new user
    const{first_name ,last_name , email,password}=req.body
    const q ='INSERT INTO registration (first_name ,last_name , email,password) VALUES (?,?,?,?)'
    db.query(q,[first_name ,last_name , email,password],(err,data)=>{

        if(err) return res.json({msg:'db error'})

        if(data){
            const newQ = 'SELECT * FROM `registration` where id=?'
    db.query(newQ,[data.insertId],(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
        }
    })
})

app.delete('/registration/:id',(req,res)=>{
    const id = req.params.id
    const q = 'DELETE FROM registration where id=?'
    db.query(q,[id],(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })

})

// middleware 
const port = process.env.PORT || 3000


app.listen(port,()=>{
    console.log('listening to port 3000 .......')
})