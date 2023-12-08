import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import { academicSemesterNameCoderMapper } from "./academicSemesterConstants";

// create an academic semester service
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // check academic semester name and code
  if (academicSemesterNameCoderMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code!");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// get all academic semester
const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

// get a specific academic semester
const getSpecificAcademicSemesterFromDB = async (semesterId: string) => {
  const result = await AcademicSemester.findById(semesterId);
  if (!result) {
    throw new Error("Semester Not Found!");
  }
  return result;
};

// update a specific academic semester
const updateSpecificAcademicSemesterIntoDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCoderMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester Code!");
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: semesterId },
    payload,
    {
      new: true,
    },
  );
  return result;
};

// export all academic semester services
export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSpecificAcademicSemesterFromDB,
  updateSpecificAcademicSemesterIntoDB
};
