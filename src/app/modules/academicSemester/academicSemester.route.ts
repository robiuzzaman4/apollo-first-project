import express from "express";
import { academicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middleweres/validateRequest";
import { academicSemesterValidationSchema } from "./academicSemesterValidation";

const router = express.Router();

// create an academic semester
router.post(
  "/create-academic-semester",
  validateRequest(
    academicSemesterValidationSchema.createAcademicSemesterValidation,
  ),
  academicSemesterControllers.createAcademicSemester,
);

// get all academic semester
router.get("/", academicSemesterControllers.getAllAcademicSemester);

// get a specific academic semester
router.get(
  "/:semesterId",
  academicSemesterControllers.getSpecificAcademicSemester,
);

// update a specific academic semester
router.patch(
  "/:semesterId",
  validateRequest(
    academicSemesterValidationSchema.updateAcademicSemesterValidation,
  ),
  academicSemesterControllers.updateSpecificAcademicSemester,
);

export const academicSemesterRoutes = router;
