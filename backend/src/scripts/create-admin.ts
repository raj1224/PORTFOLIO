import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/user.model.js";

const createAdmin = async () => {
  try {
    await connectDB();

    const email = process.argv[2]?.trim().toLowerCase();
    if (!email) {
      throw new Error("Usage: npm run create-admin -- email@example.com");
    }

    const user = await User.findOne({ email });
    if (!user) throw new Error(`User not found: ${email}`);

    if (user.role === "admin") {
      console.log(`${user.email} is already an admin`);
      return;
    }

    user.role = "admin";
    await user.save();
    console.log(`Admin role granted to: ${user.email}`);
  } catch (error) {
    console.error("Failed to create admin:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

void createAdmin();
