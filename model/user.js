const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName :{
        type :String,
        required : true
    },
    lastName :{
        type :String,
        required : true
    },
    email :{
        type :String,
        required : true,
        min : 6,
        max : 255
    },
    image:{
        type :String,
        required : true
    },
    date :{
        type:Date,
        default :Date.now
    }
})

module.exports=mongoose.model('user',userSchema)