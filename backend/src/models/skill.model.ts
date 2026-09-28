import mongoose, { Document, Schema } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: string;
  icon: string;
  order: number;
  isVisible: boolean;
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    icon: {
      type: String,
      default: "",
      trim: true,
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

const Skill = mongoose.model<ISkill>("Skill", skillSchema);

export default Skill;