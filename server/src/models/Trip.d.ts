import mongoose, { Document } from "mongoose";
export interface ITrip extends Document {
    title: string;
    destination: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    owner: mongoose.Types.ObjectId;
    members: mongoose.Types.ObjectId[];
    inviteCode: string;
    coverImage?: string;
    status: "PLANNING" | "ONGOING" | "COMPLETED";
    travelers?: number;
    itinerary?: {
        day: number;
        title: string;
        activities: string[];
    }[];
    budgetBreakdown?: {
        accommodation: number;
        food: number;
        transport: number;
        activities: number;
        miscellaneous: number;
    };
    packingList?: string[];
    localFoods?: string[];
    travelTips?: string[];
}
declare const _default: mongoose.Model<ITrip, {}, {}, {}, mongoose.Document<unknown, {}, ITrip, {}, mongoose.DefaultSchemaOptions> & ITrip & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITrip>;
export default _default;
//# sourceMappingURL=Trip.d.ts.map