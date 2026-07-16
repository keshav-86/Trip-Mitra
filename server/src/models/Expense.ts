import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  trip: mongoose.Types.ObjectId;
  paidBy: mongoose.Types.ObjectId;
  description: string;
  amount: number;
  category:
    | "FOOD"
    | "TRANSPORT"
    | "ACCOMMODATION"
    | "SHOPPING"
    | "ENTERTAINMENT"
    | "OTHER";
  participants: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new Schema<IExpense>(
  {
    trip: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },

    paidBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: [
        "FOOD",
        "TRANSPORT",
        "ACCOMMODATION",
        "SHOPPING",
        "ENTERTAINMENT",
        "OTHER",
      ],
      required: true,
    },

    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExpense>("Expense", expenseSchema);