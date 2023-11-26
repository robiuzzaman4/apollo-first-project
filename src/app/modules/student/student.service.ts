import { Student } from "./student.model";

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
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
