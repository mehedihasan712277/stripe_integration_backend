import { Request, Response } from "express";
declare const handleStripeWebhook: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const webhookController: {
    handleStripeWebhook: typeof handleStripeWebhook;
};
export {};
//# sourceMappingURL=webhook.controller.d.ts.map