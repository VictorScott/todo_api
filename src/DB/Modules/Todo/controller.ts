import { Response, NextFunction } from "express";
import { todoService } from "./service";

export const getTodoList = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await todoService.list(req.user.id, {
            status: req.query.status,
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
        });

        return res.status(result.code).json(result);
    } catch (err) {
        next(err);
    }
};

export const createTodo = async (req: any, res: Response, next: NextFunction) => {
    try {
        const result = await todoService.create(
            req.user.id,
            req.body.description
        );
        return res.status(result.code).json(result);
    } catch (err) {
        next(err);
    }
};

export const updateTodo = async (req: any, res: Response, next: NextFunction) => {
    try {
        const result = await todoService.update(
            Number(req.params.id),
            req.user.id,
            req.body.description
        );
        return res.status(result.code).json(result);
    } catch (err) {
        next(err);
    }
};

export const startTodo = async (req: any, res: Response, next: NextFunction) => {
    try {
        const result = await todoService.start(
            Number(req.params.id),
            req.user.id
        );
        return res.status(result.code).json(result);
    } catch (err) {
        next(err);
    }
};

export const completeTodo = async (req: any, res: Response, next: NextFunction) => {
    try {
        const result = await todoService.complete(
            Number(req.params.id),
            req.user.id
        );
        return res.status(result.code).json(result);
    } catch (err) {
        next(err);
    }
};

export const deleteTodo = async (req: any, res: Response, next: NextFunction) => {
    try {
        const result = await todoService.delete(
            Number(req.params.id),
            req.user.id
        );
        return res.status(result.code).json(result);
    } catch (err) {
        next(err);
    }
};
