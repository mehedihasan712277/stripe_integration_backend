import { NextFunction, Request, Response } from "express";
import { ActiveStatus, Role } from "../../generated/prisma/enums";
declare global {
    namespace Express {
        interface Request {
            user?: {
                name: string;
                email: string;
                id: string;
                role: Role;
                userStatus: ActiveStatus;
            };
        }
    }
}
export declare const auth: (...requiredRoles: Role[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map