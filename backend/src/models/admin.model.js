import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },

        refreshToken: {
            type: String,
            default: null,
            select: false,
        },

        avatar: {
            type: String,
            default: "",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);


// Hash password before saving
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);

    next();
});


// Compare password
adminSchema.methods.isPasswordCorrect = async function (
    password
) {
    return await bcrypt.compare(
        password,
        this.password
    );
};


const Admin = mongoose.model("Admin", adminSchema);

export default Admin;