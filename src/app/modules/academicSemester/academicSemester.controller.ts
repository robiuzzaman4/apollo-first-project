import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { academicSemesterServices } from "./academicSemester.service";

// create academic semester controller
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester is Created Successfully.",
    data: result,
  });
});

// get all academic semseter controller
const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemesterFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semesters Fetched Successfully.",
    data: result,
  });
});

// get all academic semseter controller
const getSpecificAcademicSemester = catchAsync(async (req, res) => {
  const result =
    await academicSemesterServices.getSpecificAcademicSemesterFromDB(
      req.params.semesterId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specific Academic Semester Fetched Successfully.",
    data: result,
  });
});

// update specific academic semester icontroller
const updateSpecificAcademicSemester = catchAsync(async (req, res) => {
  const result =
    await academicSemesterServices.updateSpecificAcademicSemesterIntoDB(
      req.params.semesterId,
      req.body
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specific Academic Semester Fetched Successfully.",
    data: result,
  });
});

// export all academic semester controller
export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSpecificAcademicSemester,
  updateSpecificAcademicSemester
};
