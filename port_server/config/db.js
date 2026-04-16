import mongoose from "mongoose";

const connectDB = async () => {
try {
const mongoUri = process.env.MONGODB_URI;


if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined in .env");
}

await mongoose.connect(mongoUri);

console.log("MongoDB connected ✅");


} catch (error) {
console.error("Database connection failed ❌");
console.error(error.message);
process.exit(1);
}
};

export default connectDB;
