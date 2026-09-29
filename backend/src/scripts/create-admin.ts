import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/user.model.js";

const createAdmin = async () => {
  try {
    await connectDB();

    const email = process.argv[2];

    if (!email) {
      console.error("Please provide an email");
      console.error("Usage: npm run create-admin -- email@example.com");
      process.exit(1);
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.error(`User not found: ${email}`);
      process.exit(1);
    }

    if (user.role === "admin") {
      console.log(`${user.email} is already an admin`);
      process.exit(0);
    }

    user.role = "admin";
    await user.save();

    console.log(`Admin role granted to: ${user.email}`);

    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

createAdmin();