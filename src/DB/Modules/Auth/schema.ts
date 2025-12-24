import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});