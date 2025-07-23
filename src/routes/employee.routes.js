import express from "express";
import {
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";
import { authenticateUser, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateUser);

router.post("/", authorizeRoles("admin", "hr"), addEmployee);
router.get("/", authorizeRoles("admin", "hr"), getEmployees);
router.get("/:id", authorizeRoles("admin", "hr"), getEmployee);
router.put("/:id", authorizeRoles("admin", "hr"), updateEmployee);
router.delete("/:id", authorizeRoles("admin", "hr"), deleteEmployee);

export default router;
