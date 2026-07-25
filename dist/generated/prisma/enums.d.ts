export declare const ActiveStatus: {
    readonly ACTIVE: 'ACTIVE';
    readonly BLOCKED: 'BLOCKED';
};
export type ActiveStatus = (typeof ActiveStatus)[keyof typeof ActiveStatus];
export declare const Role: {
    readonly ADMIN: 'ADMIN';
    readonly USER: 'USER';
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const OrderStatus: {
    readonly UNPAID: 'UNPAID';
    readonly PAID: 'PAID';
    readonly CANCELED: 'CANCELED';
    readonly FAILED: 'FAILED';
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
//# sourceMappingURL=enums.d.ts.map