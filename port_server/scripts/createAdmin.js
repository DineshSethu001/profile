
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const rl = readline.createInterface({ input, output });

const createAdmin = async () => {
  try {
    await connectDB();

    const name = (await rl.question("Admin name: ")).trim();
    const email = (await rl.question("Admin email: "))
      .trim()
      .toLowerCase();
    const password = await rl.question("Admin password: ");

    if (!name || !email || !password || password.length < 8) {
      throw new Error("Enter valid details. Password must be at least 8 characters.");
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      throw new Error("An admin with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("Admin account created successfully!");
  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
    await mongoose.disconnect();
  }
};

createAdmin();
