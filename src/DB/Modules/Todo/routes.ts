import { Router } from "express";

import {
    createTodo,
    updateTodo,
    startTodo,
    completeTodo,
    deleteTodo, getTodoList,
} from "./controller";
import {createTodoSchema, listTodoSchema, updateTodoSchema} from "@DB/Modules/Todo/schema";
import validateRequest from "@DB/Middlewares/validation";
import authenticate from "@DB/Middlewares/auth";

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
