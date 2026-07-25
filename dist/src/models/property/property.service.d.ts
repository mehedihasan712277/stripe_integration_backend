declare const craetePropertyIntoDb: (propertyData: any) => Promise<void>;
declare const getAllPropertiesFromDb: () => Promise<void>;
declare const getPropertyByIdFromDb: (id: string) => Promise<void>;
declare const updatePropertyInDb: (id: string, propertyData: any) => Promise<void>;
declare const deletePropertyFromDb: (id: string) => Promise<void>;
export declare const propertyService: {
    craetePropertyIntoDb: typeof craetePropertyIntoDb;
    getAllPropertiesFromDb: typeof getAllPropertiesFromDb;
    getPropertyByIdFromDb: typeof getPropertyByIdFromDb;
    updatePropertyInDb: typeof updatePropertyInDb;
    deletePropertyFromDb: typeof deletePropertyFromDb;
};
export {};
//# sourceMappingURL=property.service.d.ts.map