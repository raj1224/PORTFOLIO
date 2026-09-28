import mongoose, { Document, Schema } from "mongoose";

export interface ICurrentStatus extends Document {
  title: string;
  description: string;
  type: "learning" | "working" | "building";
  status: "planning" | "in_progress" | "completed" | "paused";
  order: number;
  isVisible: boolean;
}

const currentStatusSchema = new Schema<ICurrentStatus>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    type: {
      type: String,
      enum: ["learning", "working", "building"],
      required: true,
    },

    status: {
      type: String,
      enum: ["planning", "in_progress", "completed", "paused"],
      default: "in_progress",
    },

    order: {
      type: Number,
      default: 0,
      min: 0,
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const CurrentStatus = mongoose.model<ICurrentStatus>(
  "CurrentStatus",
  currentStatusSchema
);

export default CurrentStatus;