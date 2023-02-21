
































// router.post('/register' , async(req , res)=>{
    //     // validation
    //     const{error}=registerValidation(req.body)
    //     if(error) return res.status(400).send(error.details[0].message)
    
    //     //check if the database is exist
    //     const email = await User.findOne({email : req.body.email})
    //     if(email){
    //         res.status(400).send('email already exist')
    //     }
    //     // create a new user
    //     const user = new User({
    //         first_name : req.body.first_name,
    //         last_name : req.body.last_name,
    //         email : req.body.email,
    //         password : req.body.password
    //     })
        
    //     try {
    //         const savedUser = await user.save()
    //         res.send(savedUser)
    //     } catch (err) {
    //         res.status(200).send(err)
    //     }
    // })
    
    // router.get('/users',async(req , res)=>{
    //     const allUsers=await User.find()
    //     if(allUsers) return res.status(200).send(allUsers)
    // })
    
    // router.delete('/:id',async(req,res)=>{
    //     const id = req.params.id
    //     const deletedPosts =await User.deleteOne({_id:id})
    //     if(deletedPosts) res.json(deletedPosts)
    // })
    