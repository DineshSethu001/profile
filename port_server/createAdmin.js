import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const email = "admin@example.com";
const password = "admin123";

const existing = await Admin.findOne({ email });
if (existing) {
  console.log(`Admin already exists (${email})`);
  process.exit();
}

const hashed = await bcrypt.hash(password, 10);

await Admin.create({
  email,
  password: hashed
});

console.log("Admin created");
process.exit();
process.exit();