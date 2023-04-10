const express = require('express')
const mysql = require('mysql')
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

// Get categories
app.get('/categories',(req,res)=>{
    const q = 'SELECT * FROM `categories`'
    db.query(q,(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
})
//Post categories
app.post('/categories',(req,res)=>{
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
///////////////////////////////////////////////////
// Get Comments
app.get('/Comments',(req,res)=>{
    const q = 'SELECT * FROM `Comments`'
    db.query(q,(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
})
// Post Comments
app.post('/Comments',(req,res)=>{
    //new user
    const{commentedPersonEmail ,Content}=req.body

    const q ='INSERT INTO Comments (commentedPersonEmail ,Content) VALUES (?,?)'
    db.query(q,[commentedPersonEmail ,Content],(err,data)=>{

        if(err) return res.json({msg:'db error'})

        if(data){
            const newQ = 'SELECT * FROM `Comments` where PostId=?'
    db.query(newQ,[data.insertId],(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
        }
    })
})
///////////////////////////////////////////
app.get('/Posts',(req,res)=>{
    const q = 'SELECT * FROM `Posts`'
    db.query(q,(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
})


// middleware 
const port = process.env.PORT || 3000


app.listen(port,()=>{
    console.log('listening to port 3000 .......')
})