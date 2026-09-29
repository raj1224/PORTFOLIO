import mongoose, { Document, Schema } from "mongoose";

export interface IProfile extends Document {
  user: mongoose.Types.ObjectId;
  fullName: string;
  bio: string;
  title: string;
  location: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  avatar: {
  url: string;
  publicId: string;
};

resumeUrl: {
  url: string;
  publicId: string;
};
}

const profileSchema = new Schema<IProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      trim: true,
      default: "",
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    title: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    github: {
      type: String,
      trim: true,
      default: "",
    },

    linkedin: {
      type: String,
      trim: true,
      default: "",
    },

    twitter: {
      type: String,
      trim: true,
      default: "",
    },

    avatar: {
  url: {
    type: String,
    default: "",
  },
  publicId: {
    type: String,
    default: "",
  },
},

    resumeUrl: {
  url: {
    type: String,
    default: "",
  },
  publicId: {
    type: String,
    default: "",
  },
},
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;