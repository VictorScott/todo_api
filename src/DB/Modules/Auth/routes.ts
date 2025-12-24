import { Router } from "express";
import {loginSchema, registerSchema} from "@DB/Modules/Auth/schema";
import validateRequest from "@DB/Middlewares/validation";
import {login, refreshToken, register} from "@DB/Modules/Auth/controller";

const authRouter = Router();

authRouter.post(
    "/register",
    validateRequest(registerSchema),
    register
);

authRouter.post(
    "/login",
    validateRequest(loginSchema),
    login
);

authRouter.post("/refresh-token", refreshToken);

export default authRouter;
