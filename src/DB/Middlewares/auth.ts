import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "@Models/User";
import appConfig from "../../config";

interface JwtPayload {
    id: number;
}

const authenticate = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({
                    success: false,
                    code: 401,
                    message: "Authorization header missing",
                });
            }

            const [type, token] = authHeader.split(" ");

            if (type !== "Bearer" || !token) {
                return res.status(401).json({
                    success: false,
                    code: 401,
                    message: "Invalid authorization format",
                });
            }

            let decoded: JwtPayload;

            try {
                decoded = jwt.verify(
                    token,
                    appConfig.jwt.secret
                ) as JwtPayload;
            } catch (err) {
                return res.status(401).json({
                    success: false,
                    code: 401,
                    message: "Invalid or expired token",
                });
            }

            const user = await User.findByPk(decoded.id);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    code: 401,
                    message: "User no longer exists",
                });
            }

            req.user = user;
            next();
        } catch (err) {
            next(err);
        }
    };
};

export default authenticate;
