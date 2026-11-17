
import express from "express";

import {
  adminLogin,
  adminLogout,
  getAdminProfile,
} from "../controllers/adminController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Public route - Admin login
router.post("/login", adminLogin);

// Protected route - Admin profile
router.get("/profile", adminAuth, getAdminProfile);

// Protected route - Admin logout
router.post("/logout", adminAuth, adminLogout);

export default router;
