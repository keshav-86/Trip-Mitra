import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    avatar: string;
    isVerified: boolean;
    otp?: string;
    otpExpiry?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default User;
//# sourceMappingURL=User.d.ts.map