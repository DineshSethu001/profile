import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* 🧩 Middlewares */
app.use(cors());
app.use(express.json());

/* 🚀 Start Server AFTER DB */
const startServer = async () => {
try {
await connectDB(); // ✅ wait for DB


app.use("/api/projects", projectRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});


} catch (error) {
console.error("Server failed:", error.message);
process.exit(1);
}
};

startServer();
