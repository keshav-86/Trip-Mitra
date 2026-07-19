import mongoose, { Document } from "mongoose";
export interface IExpense extends Document {
    trip: mongoose.Types.ObjectId;
    paidBy: mongoose.Types.ObjectId;
    description: string;
    amount: number;
    category: "FOOD" | "TRANSPORT" | "ACCOMMODATION" | "SHOPPING" | "ENTERTAINMENT" | "OTHER";
    participants: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IExpense, {}, {}, {}, mongoose.Document<unknown, {}, IExpense, {}, mongoose.DefaultSchemaOptions> & IExpense & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IExpense>;
export default _default;
//# sourceMappingURL=Expense.d.ts.map