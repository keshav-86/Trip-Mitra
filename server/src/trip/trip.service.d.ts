export declare const createTrip: (title: string, destination: string, description: string, startDate: Date, endDate: Date, budget: number, owner: string, additionalData?: {
    travelers?: number;
    itinerary?: any[];
    budgetBreakdown?: any;
    packingList?: string[];
    localFoods?: string[];
    travelTips?: string[];
}) => Promise<import("mongoose").Document<unknown, {}, import("../models/Trip").ITrip, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Trip").ITrip & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const getMyTrips: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Trip").ITrip, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Trip").ITrip & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getTripById: (tripId: string, userId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/Trip").ITrip, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Trip").ITrip & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const updateTrip: (tripId: string, userId: string, data: {
    title?: string;
    destination?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    budget?: number;
    travelers?: number;
    itinerary?: any[];
    budgetBreakdown?: any;
    packingList?: string[];
    localFoods?: string[];
    travelTips?: string[];
}) => Promise<import("mongoose").Document<unknown, {}, import("../models/Trip").ITrip, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Trip").ITrip & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const deleteTrip: (tripId: string, userId: string) => Promise<{
    message: string;
}>;
export declare const joinTrip: (inviteCode: string, userId: string) => Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, import("../models/Trip").ITrip, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Trip").ITrip & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, import("../models/Trip").ITrip, import("../models/Trip").ITrip>>;
export declare const leaveTrip: (tripId: string, userId: string) => Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, import("../models/Trip").ITrip, {}, import("mongoose").DefaultSchemaOptions> & import("../models/Trip").ITrip & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, {}, import("../models/Trip").ITrip, import("../models/Trip").ITrip>>;
//# sourceMappingURL=trip.service.d.ts.map