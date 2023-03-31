//Validation
const Joi = require('@hapi/joi')

//Register Validation
const categoriesValidation = (data)=>{
        const schema = Joi.object({
        image: Joi.string().
        required(),
        swappedNumber: Joi.string().
        required(),
        title : Joi.string().
        required()
        } )
        return schema.validate(data)
}


module.exports.categoriesValidation=categoriesValidation




