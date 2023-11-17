import { Student } from "./student.interface";
import { StudentModel } from "./student.model";

const createStudentIntoDB = async (student: Student) => {
  return await StudentModel.create(student);
};

const getAllStudentsFromDB = async () => {
  return await StudentModel.find();
};

const getSingleStudentFromDB = async (id: string) => {
  return await StudentModel.findOne({ id });
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
