import Joi from "joi";
import { TodoStatus } from "@Models/Todo";

export const createTodoSchema = Joi.object({
    description: Joi.string().min(3).required(),
});

export const updateTodoSchema = Joi.object({
    description: Joi.string().min(3).required(),
});

export const todoIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});

export const changeStatusSchema = Joi.object({
    status: Joi.string()
        .valid(
            TodoStatus.PENDING,
            TodoStatus.STARTED,
            TodoStatus.COMPLETED
        )
        .required(),
});

export const listTodoSchema = Joi.object({
    status: Joi.string()
        .valid(
            TodoStatus.PENDING,
            TodoStatus.STARTED,
            TodoStatus.COMPLETED
        )
        .optional(),

    page: Joi.number().integer().min(1).default(1),

    limit: Joi.number().integer().min(1).max(100).default(10),
});

