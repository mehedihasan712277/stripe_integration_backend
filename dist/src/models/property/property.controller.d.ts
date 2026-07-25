import { NextFunction, Request, Response } from "express";
declare const createProperty: () => (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getAllProperties: () => (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getPropertyById: () => (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateProperty: () => (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const deleteProperty: () => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const propertyController: {
    createProperty: typeof createProperty;
    getAllProperties: typeof getAllProperties;
    getPropertyById: typeof getPropertyById;
    updateProperty: typeof updateProperty;
    deleteProperty: typeof deleteProperty;
};
export {};
//# sourceMappingURL=property.controller.d.ts.map