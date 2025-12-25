import { Router } from "express";
import {loginSchema, registerSchema} from "@Modules/Auth/schema";
import validateRequest from "../../Middlewares/validation";
import {login, refreshToken, register} from "@Modules/Auth/controller";

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
