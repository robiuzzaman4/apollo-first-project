import { NextFunction, Request, Response } from "express";
import { studentServices } from "./student.service";

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: "Fetch Students Data Successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await studentServices.getSingleStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: "Fetch Single Student Data Successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await studentServices.deleteStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: "Delete Student Data Successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
