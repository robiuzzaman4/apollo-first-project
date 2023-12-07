import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createAcademicSemester = catchAsync(async (req, res, next) => {
//   const { password, student: studentData } = req.body;

//   const result = await userServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Create Successfully.",
    data: "result",
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
};
