import { z } from "zod";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemesterConstants";

const academicSemesterValidation = z.object({
  name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
  year: z.date(),
  code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
  startMonth: z.enum([...Months] as [string, ...string[]]),
  endMonth: z.enum([...Months] as [string, ...string[]]),
});

export const academicSemesterValidationSchema = { 
    academicSemesterValidation
 };
