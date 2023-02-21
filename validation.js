//Validation
const Joi = require('@hapi/joi')

//Register Validation
const registerValidation = (data)=>{
        const schema = Joi.object({
        first_name: Joi.string().
                required(),
        last_name: Joi.string().
                required(),
        email : Joi.string().
        required().
        min(6).
        email(),
        password : Joi.string().
        required().
        min(5)
        } )
        return schema.validate(data)
}


module.exports.registerValidation=registerValidation




