import express from "express";
import { userControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middleweres/validateRequest";

const router = express.Router();

// create a student route
router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent,
);

export const userRoutes = router;
