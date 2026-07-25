import { NextFunction, Request, Response } from "express";
declare const createPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const paymentController: {
    createPayment: typeof createPayment;
};
export {};
//# sourceMappingURL=payment.controller.d.ts.map