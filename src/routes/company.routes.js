// src/routes/company.routes.js
import express from "express";
import {
  createCompany,
  getMyCompanies,
} from "../controllers/company.controllers.js";
import {
  authenticateUser,
  authorizeRoles,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateUser, authorizeRoles("owner"), createCompany);
router.get("/", authenticateUser, getMyCompanies);

export default router;
