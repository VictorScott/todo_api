import { User } from "@Models/User";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export {};
