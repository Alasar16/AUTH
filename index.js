const express = require('express')
const mysql = require('mysql')
const {registerValidation}=require('./validation')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(express.json())




////////////////////////////////////////////////////
//connsect to DB


const db = mysql.createConnection({
    host     : 'https://uninterested-dungarees-fish.cyclic.app',
    user     : 'root',
    password : '',
    database : 'user',
    port:'3306'
})


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
        if(error) return res.status(400).send(error.details[0].message)

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
const port = 3000 || process.env.PORT


app.listen(port,()=>{
    console.log('listening to port 3000 .......')
})