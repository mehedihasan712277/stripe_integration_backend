export type TOrderItem = {
    name: string;
    description?: string;
    price: number;
    images: string[];
    quantity: number;
};

export type TCreateOrderPayload = {
    items: TOrderItem[];
};
