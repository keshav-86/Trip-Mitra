import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  trip: mongoose.Types.ObjectId;
  paidBy: mongoose.Types.ObjectId;
  description: string;
  amount: number;
  category: string;
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
      min: 1,
    },

    category: {
      type: String,
      enum: [
        "Food",
        "Travel",
        "Hotel",
        "Shopping",
        "Fuel",
        "Entertainment",
        "Other",
      ],
      default: "Other",
    },

    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;