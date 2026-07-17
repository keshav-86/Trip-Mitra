import mongoose, { Document, Schema } from "mongoose";

export interface ITrip extends Document {
  title: string;
  destination: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  owner: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  inviteCode: string; // NEW
  coverImage?: string;
  status: "PLANNING" | "ONGOING" | "COMPLETED";
}

const tripSchema = new Schema<ITrip>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // NEW FIELD
    inviteCode: {
      type: String,
      required: true,
      unique: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["PLANNING", "ONGOING", "COMPLETED"],
      default: "PLANNING",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITrip>("Trip", tripSchema);