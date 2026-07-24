import { Response } from "express";
type TMeta = {
    page: number;
    limit: number;
    total: number;
};
type TResponsedata<T> = {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    meta?: TMeta;
    count?: number;
};
export declare const sendResponse: <T>(res: Response, data: TResponsedata<T>) => void;
export {};
//# sourceMappingURL=sendResponse.d.ts.map