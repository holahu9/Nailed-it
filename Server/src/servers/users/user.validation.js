const { Joi } = require('express-validation')
const registerValidation = {
    body:Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(5).required(),
        role:Joi.string().valid('1','2').required(),
        name:Joi.string().required()
    })
}
const loginValidation = {
    body:Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(5)
    })
}
module.exports = {
    registerValidation,
    loginValidation
}