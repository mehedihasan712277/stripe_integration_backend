import { TCheckoutItem } from "./payment.interface";
declare const handleCheckOut: (payload: TCheckoutItem[]) => Promise<{
    id: string;
    url: string | null;
}>;
export declare const paymentServices: {
    handleCheckOut: typeof handleCheckOut;
};
export {};
//# sourceMappingURL=payment.service.d.ts.map