import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";

const createAdmin = async () => {
  try {
    await connectDB();

    const email = process.argv[2]?.trim().toLowerCase();

    if (!email) {
      throw new Error("Usage: npm run create-admin -- email@example.com");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(`User not found: ${email}`);
    }

    // Make user admin
    if (user.role !== "admin") {
      user.role = "admin";
      await user.save();

      console.log(`Admin role granted to: ${user.email}`);
    } else {
      console.log(`${user.email} is already an admin`);
    }

    // Create profile if it doesn't already exist
    const existingProfile = await Profile.findOne({
      user: user._id,
    });

    if (!existingProfile) {
      await Profile.create({
        user: user._id,
        fullName: user.username,
      });

      console.log(`Profile created for: ${user.email}`);
    } else {
      console.log(`Profile already exists for: ${user.email}`);
    }
  } catch (error) {
    console.error("Failed to create admin:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

void createAdmin();