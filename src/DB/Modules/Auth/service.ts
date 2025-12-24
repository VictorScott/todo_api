import { User } from "@Models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appConfig from "../../../config";

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

interface LoginPayload {
    email: string;
    password: string;
}

export const authService = {

    register: async (
        payload: RegisterPayload
    ) => {
        const { name, email, password } = payload;

        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return {
                success: false,
                code: 409,
                message: "Email already registered",
            };
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        // @ts-ignore
        const accessToken = jwt.sign(
            { id: user.id },
            appConfig.jwt.secret,
            { expiresIn: appConfig.jwt.ttl }
        );

        // @ts-ignore
        const refreshToken = jwt.sign(
            { id: user.id },
            appConfig.jwt.secret,
            { expiresIn: appConfig.jwt.refreshttl }
        );

        const safeUser = user.get({ plain: true }) as any;
        delete safeUser.password;

        return {
            success: true,
            code: 201,
            message: "User registered successfully",
            data: {
                user: safeUser,
                accessToken,
                refreshToken,
            },
        };
    },

    login: async (
        payload: LoginPayload
    ) => {
        const { email, password } = payload;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return {
                success: false,
                code: 401,
                message: "Invalid credentials",
            };
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return {
                success: false,
                code: 401,
                message: "Invalid credentials",
            };
        }

        // @ts-ignore
        const accessToken = jwt.sign(
            { id: user.id },
            appConfig.jwt.secret,
            { expiresIn: appConfig.jwt.ttl }
        );

        // @ts-ignore
        const refreshToken = jwt.sign(
            { id: user.id },
            appConfig.jwt.secret,
            { expiresIn: appConfig.jwt.refreshttl }
        );

        const safeUser = user.get({ plain: true }) as any;
        delete safeUser.password;

        return {
            success: true,
            code: 200,
            message: "Login successful",
            data: {
                user: safeUser,
                accessToken,
                refreshToken,
            },
        };
    },

    refreshAccessToken: async (
        refreshToken: string
    ) => {
        if (!refreshToken) {
            return {
                success: false,
                code: 400,
                message: "Refresh token missing",
            };
        }

        try {
            const decoded = jwt.verify(
                refreshToken,
                appConfig.jwt.secret
            ) as { id: number };

            const user = await User.findByPk(decoded.id);
            if (!user) {
                return {
                    success: false,
                    code: 401,
                    message: "Invalid refresh token",
                };
            }

            // @ts-ignore
            const newAccessToken = jwt.sign(
                { id: user.id },
                appConfig.jwt.secret,
                { expiresIn: appConfig.jwt.ttl }
            );

            return {
                success: true,
                code: 200,
                message: "Access token refreshed",
                data: {
                    accessToken: newAccessToken,
                },
            };
        } catch {
            return {
                success: false,
                code: 401,
                message: "Invalid or expired refresh token",
            };
        }
    },
};
