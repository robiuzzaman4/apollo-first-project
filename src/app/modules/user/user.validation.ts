import { z } from "zod";

const userSchemaValidation = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be string!",
    })
    .max(20, { message: "Password Can't be 20 Characters" })
    .optional(),
});

export default userSchemaValidation;
