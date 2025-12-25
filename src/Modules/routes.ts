import { Router } from "express";
import authRouter from "@Modules/Auth/routes";
import todoRouter from "@Modules/Todo/routes";

const entryRouter = Router();

entryRouter.use("/auth", authRouter);
entryRouter.use("/todo", todoRouter);

entryRouter.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Entry Route Not Found",
        routecalled: req.originalUrl,
    });
});
export default entryRouter;
