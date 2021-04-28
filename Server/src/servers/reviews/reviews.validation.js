const { Joi } = require('express-validation')
const CreateNewReviews = {
    body:Joi.object({
        comment:Joi.string().required(),
        star:Joi.number().min(1).max(5).required(),
        profile:Joi.string().required()
    })
}
const GetListReviews = {
    body:Joi.object({
        profile:Joi.string().required()
    })
}
const UpdateReviews = {
    body:Joi.object({
        id:Joi.string().required(),
        comment:Joi.string(),
        star:Joi.number().min(1).max(5),
    })
}
const DeleteReviews = {
    body:Joi.object({
        id:Joi.string().required()
    })
}
module.exports = {
    CreateNewReviews,
    GetListReviews,
    UpdateReviews,
    DeleteReviews
}