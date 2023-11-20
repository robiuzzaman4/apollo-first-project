import { Request, Response } from "express";
import { studentServices } from "./student.service";
import studentValidationSchema from "./student.validation";
// import studentValidationSchema from "./student.joi.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;

    // validate joi schema
    // const { error, value } = studentValidationSchema.validate(student);
    // const result = await studentServices.createStudentIntoDB(value);

    // validate by using zod
    const zodParsedData = studentValidationSchema.parse(student);

    const result = await studentServices.createStudentIntoDB(zodParsedData);

    // error from joi
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "Something went wrong.",
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Student Create Successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: "Fetch Students Data Successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await studentServices.getSingleStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: "Fetch Single Student Data Successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
      error: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await studentServices.deleteStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: "Delete Student Data Successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
      error: error,
    });
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
