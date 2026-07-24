import { ILoginUser, RegisterUserPayload } from "./auth.interface";
declare const loginUser: (payload: ILoginUser) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
declare const refreshToken: (refreshToken: string) => Promise<{
    accessToken: string;
}>;
declare const register: (payload: RegisterUserPayload) => Promise<({
    profile: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    name: string;
    email: string;
    role: import("../../../generated/prisma/enums").Role;
    status: import("../../../generated/prisma/enums").ActiveStatus;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
declare const getMyProfileFromDB: (userId: string) => Promise<{
    profile: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    name: string;
    email: string;
    role: import("../../../generated/prisma/enums").Role;
    status: import("../../../generated/prisma/enums").ActiveStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const authService: {
    loginUser: typeof loginUser;
    refreshToken: typeof refreshToken;
    register: typeof register;
    getMyProfileFromDB: typeof getMyProfileFromDB;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map