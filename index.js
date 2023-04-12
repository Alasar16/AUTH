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
// Get Posts
app.get('/Posts',(req,res)=>{
    const q = 'SELECT * FROM `Posts`'
    db.query(q,(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
})
// Post Posts
app.post('/Posts',(req,res)=>{
    //new user
    const{images ,isKnown,userEmail,videos,content}=req.body

    const q ='INSERT INTO Posts (images ,isKnown,userEmail,videos,content) VALUES (?,?,?,?,?)'
    db.query(q,[images ,isKnown,userEmail,videos,content],(err,data)=>{

        if(err) return res.json({msg:'db error'})

        if(data){
            const newQ = 'SELECT * FROM `Posts` where id=?'
    db.query(newQ,[data.insertId],(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
        }
    })
})
/////////////////////////////////////////
// Get Donated 
app.get('/Donated',(req,res)=>{
    const q = 'SELECT * FROM `Donated`'
    db.query(q,(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
})
// Post Donated 
app.post('/Donated',(req,res)=>{
    //new user
    const{donatedPersonEmail ,donattedThing,userEmail,location}=req.body

    const q ='INSERT INTO Donated  (donatedPersonEmail ,donattedThing,userEmail,location) VALUES (?,?,?,?)'
    db.query(q,[donatedPersonEmail ,donattedThing,userEmail,location],(err,data)=>{

        if(err) return res.json({msg:'db error'})

        if(data){
            const newQ = 'SELECT * FROM `Donated` where id=?'
    db.query(newQ,[data.insertId],(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
        }
    })
})
/////////////////////////////////////////
// Get Swapped 
app.get('/Swapped',(req,res)=>{
    const q = 'SELECT * FROM `Swapped`'
    db.query(q,(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
})
// Post Swapped 
app.post('/Swapped',(req,res)=>{
    //new user
    const{isKnown ,swappedLocation,Swap2,userEmail2,Swap1,userEmail1}=req.body

    const q ='INSERT INTO Swapped  (isKnown ,swappedLocation,Swap2,userEmail2,Swap1,userEmail1) VALUES (?,?,?,?,?,?)'
    db.query(q,[isKnown ,swappedLocation,Swap2,userEmail2,Swap1,userEmail1],(err,data)=>{

        if(err) return res.json({msg:'db error'})

        if(data){
            const newQ = 'SELECT * FROM `Swapped` where id=?'
    db.query(newQ,[data.insertId],(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
        }
    })
})
/////////////////////////////////////////
// Get users 
app.get('/users',(req,res)=>{
    const q = 'SELECT * FROM `users`'
    db.query(q,(err,data)=>{
        if(err) return res.json({msg:'db error'})
        if(data) return res.json(data)
    })
})
// Post users 
app.post('/users',(req,res)=>{
    //new user
    const{phoneNumber ,address,kind,name,type,email}=req.body

    const q ='INSERT INTO users  (phoneNumber ,address,kind,name,type,email) VALUES (?,?,?,?,?,?)'
    db.query(q,[phoneNumber ,address,kind,name,type,email],(err,data)=>{

        if(err) return res.json({msg:'db error'})

        if(data){
            const newQ = 'SELECT * FROM `users` where email=?'
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