import { NextFunction, Request, Response } from "express";
export declare const authController: {
    loginUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    registerUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMyProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logoutUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=auth.controller.d.ts.map