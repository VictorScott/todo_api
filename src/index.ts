import "dotenv/config";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import db from "./DB/db";
import appConfig from "./config";
import entryRouter from "@DB/Modules/routes";

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", entryRouter);

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
        routecalled: req.originalUrl,
    });
});

// Start server AFTER DB connection
async function startServer() {
    try {
        await db.authenticate();
        console.log("✅ Database connected");

        if (
            appConfig.environment === "development" &&
            appConfig.database.migrate
        ) {
            await db.sync({ alter: true });
            console.log("🔄 Database synced");
        }

        app.listen(appConfig.port, () => {
            console.log(`🚀 Server running on port ${appConfig.port}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
