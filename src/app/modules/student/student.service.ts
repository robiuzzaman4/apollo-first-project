import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  // create student by using mongoose builtin static method
  // return await Student.create(studentData);

  // create an custom instance
  if (await Student.isStudentExists(studentData.id)) {
    throw Error("User already exists!");
  }

  return await Student.create(studentData);

  // create student by using mongoose custom instance method
  // const student = new Student(studentData);

  // if (await student.isStudentExists(studentData.id)) {
  //   throw Error("User already exists!");
  // }

  // return await student.save();
};

const getAllStudentsFromDB = async () => {
  return await Student.find();
};

const getSingleStudentFromDB = async (id: string) => {
  // return await Student.findOne({ id });
  return await Student.aggregate([{ $match: { id: id } }]);
};

const deleteStudentFromDB = async (id: string) => {
  return await Student.updateOne({ id }, { isDeleted: true });
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
