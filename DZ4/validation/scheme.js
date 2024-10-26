const Joi = require('joi');

const usersSchema = Joi.object({
    
    last_name: Joi.string().regex(/^[а-яА-Яa-zA-Z]+$/).required(),
    first_name: Joi.string().regex(/^[а-яА-Яa-zA-Z]+$/).required(),
    age: Joi.number().required(),
    specialization: Joi.string().required(),
    phone: Joi.number().required(),
});

const idSchema = Joi.object({
    id: Joi.number().required(),
});

module.exports = {usersSchema, idSchema};