import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    // validate by using zod
    // const zodParsedData = studentValidationSchema.parse(student);

    const result = await userServices.createStudentIntoDB(
      password,
      studentData,
    );

    res.status(200).json({
      success: true,
      message: "Student Create Successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userControllers = {
  createStudent,
};
