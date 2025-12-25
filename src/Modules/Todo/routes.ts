import { Router } from "express";

import {
    createTodo,
    updateTodo,
    startTodo,
    completeTodo,
    deleteTodo, getTodoList,
} from "./controller";
import {createTodoSchema, listTodoSchema, updateTodoSchema} from "@Modules/Todo/schema";
import validateRequest from "../../Middlewares/validation";
import authenticate from "../../Middlewares/auth";

const todoRouter = Router();

todoRouter.use(authenticate());

todoRouter.get(
    "/",
    validateRequest(listTodoSchema, "Query"),
    getTodoList
);

todoRouter.post(
    "/",
    validateRequest(createTodoSchema),
    createTodo
);

todoRouter.put(
    "/:id",
    validateRequest(updateTodoSchema),
    updateTodo
);

todoRouter.patch("/:id/start", startTodo);

todoRouter.patch("/:id/complete", completeTodo);

todoRouter.delete("/:id", deleteTodo);

export default todoRouter;
