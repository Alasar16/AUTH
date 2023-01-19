//Validation
const Joi = require('@hapi/joi')

//Register Validation
const registerValidation = (data)=>{
    const schema = Joi.object({
    firstName: Joi.string().
            required().
            min(4),
    lastName: Joi.string().
            required().
            min(4),
    email : Joi.string().
    required().
    min(6).
    email(),
    password : Joi.string().
    required().
    min(6)
    } )
    return schema.validate(data)
}


module.exports.registerValidation=registerValidation




