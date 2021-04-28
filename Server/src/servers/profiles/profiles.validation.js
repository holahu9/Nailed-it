const { Joi } = require('express-validation')
const CreateNewProfile = {
    body:Joi.object({
        name:Joi.string().required(),
        phone:Joi.string().min(5).required(),
        image:Joi.string().required(),
        salon_name:Joi.string().required(),
        website:Joi.string().required(),
        images:Joi.array().items(Joi.string)
    })
}
const UpdateProfile = {
    body:Joi.object({
        id:Joi.string().required(),
        name:Joi.string(),
        phone:Joi.string().min(5),
        image:Joi.string(),
        salon_name:Joi.string(),
        website:Joi.string()
    })
}
module.exports = {
    CreateNewProfile,
    UpdateProfile
}