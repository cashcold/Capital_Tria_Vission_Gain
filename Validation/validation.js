const Joi = require('@hapi/joi')

const RegisterValidation = (data)=>{
    const schema = Joi.object({
        full_Name: Joi.string().required().min(6).max(100),
        user_Name: Joi.string().required().min(5).max(50),
        password: Joi.string().required().min(6).max(1020),
        email: Joi.string().email().required(),
        bitcoin: Joi.).min(5).max(5145),
        bticoinCash: Joi.string().min(5).max(5145),
        ethereum: Joi.string().min(5).max(5145)
    })

    return schema.validate(data)
}

module.exports.RegisterValidation = RegisterValidation;