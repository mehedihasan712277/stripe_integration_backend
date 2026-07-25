import { TCreateProperty, TUpdateProperty } from "./property.interface";
declare const craetePropertyIntoDb: (payload: TCreateProperty, userId: string) => Promise<{
    id: string;
    name: string;
    description: string | null;
    rentPrice: number;
    stripeProductId: string | null;
    stripePriceId: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getAllPropertiesFromDb: () => Promise<({
    user: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").ActiveStatus;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    name: string;
    description: string | null;
    rentPrice: number;
    stripeProductId: string | null;
    stripePriceId: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const getPropertyByIdFromDb: (id: string) => Promise<{
    user: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").ActiveStatus;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    name: string;
    description: string | null;
    rentPrice: number;
    stripeProductId: string | null;
    stripePriceId: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const updatePropertyInDb: (id: string, payload: TUpdateProperty) => Promise<{
    id: string;
    name: string;
    description: string | null;
    rentPrice: number;
    stripeProductId: string | null;
    stripePriceId: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const deletePropertyFromDb: (id: string) => Promise<{
    id: string;
    name: string;
    description: string | null;
    rentPrice: number;
    stripeProductId: string | null;
    stripePriceId: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const propertyService: {
    craetePropertyIntoDb: typeof craetePropertyIntoDb;
    getAllPropertiesFromDb: typeof getAllPropertiesFromDb;
    getPropertyByIdFromDb: typeof getPropertyByIdFromDb;
    updatePropertyInDb: typeof updatePropertyInDb;
    deletePropertyFromDb: typeof deletePropertyFromDb;
};
export {};
//# sourceMappingURL=property.service.d.ts.map