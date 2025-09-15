import express from "express";
import { getAllEmployees, getEmployees, deleteEmployees, updateEmployees, createEmployees } from "../controllers/employee.js";


const router = express.Router();

// Haciendo un CRUD
router.get("/",getAllEmployees);

router.get("/:id", getEmployees);

router.post("/", createEmployees);

router.delete("/:id", deleteEmployees);

router.put("/:id", updateEmployees);

export default router;