export declare const registerUser: (fullName: string, email: string, password: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/User").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const loginUser: (email: string, password: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/User").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../models/User").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const generateToken: (userId: string) => string;
//# sourceMappingURL=auth.service.d.ts.map