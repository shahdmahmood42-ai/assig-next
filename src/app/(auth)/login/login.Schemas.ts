import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod.email("Email isn't in Format").nonempty("Email Is Required"),
  password: zod
    .string("password must be text ")
    .nonempty("password is req")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      `1] Min 1 Special Character 2] Min 1 Number 3] Min 8 Characters or More `,
    ),
});
