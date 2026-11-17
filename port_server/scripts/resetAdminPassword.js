
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const rl = readline.createInterface({ input, output });

const resetPassword = async () => {
  try {
    await connectDB();

    const email = (await rl.question("Admin email: "))
      .trim()
      .toLowerCase();

    const password = await rl.question("New password: ");

    if (password.length < 8) {
      throw new Error("Password must contain at least 8 characters.");
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      throw new Error("Admin account not found.");
    }

    admin.password = await bcrypt.hash(password, 12);
    await admin.save();

    console.log("Admin password updated successfully!");
  } catch (error) {
    console.error("Password reset failed:", error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
    await mongoose.disconnect();
  }
};

resetPassword();
