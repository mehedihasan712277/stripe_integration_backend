export type TCreateProperty = {
    name: string;
    description?: string;
    rentPrice: number;
};

export type TUpdateProperty = Partial<TCreateProperty>;
