import { TCreateCheckoutPayload } from "./checkout.interface";
declare const createCheckoutSession: (payload: TCreateCheckoutPayload, userId: string) => Promise<{
    orderId: string;
    url: string | null;
}>;
export declare const checkoutServices: {
    createCheckoutSession: typeof createCheckoutSession;
};
export {};
//# sourceMappingURL=checkout.service.d.ts.map