export type TCheckoutItem = {
    id: string;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    images: string[];
};
export type TCreateCheckoutPayload = {
    items: TCheckoutItem[];
    userId?: string;
};
//# sourceMappingURL=payment.interface.d.ts.map