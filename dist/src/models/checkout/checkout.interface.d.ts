export type TCheckoutItem = {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    images: string[];
};
export type TCreateCheckoutPayload = {
    items: TCheckoutItem[];
};
//# sourceMappingURL=checkout.interface.d.ts.map