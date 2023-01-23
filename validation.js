//Validation
const Joi = require('@hapi/joi')

//Register Validation
const registerValidation = (data)=>{
        const schema = Joi.object({
        firstName: Joi.string().
                required(),
        lastName: Joi.string().
                required(),
        email : Joi.string().
        required().
        min(6).
        email(),
        image : Joi.string().
        required()
        } )
        return schema.validate(data)
}


module.exports.registerValidation=registerValidation




