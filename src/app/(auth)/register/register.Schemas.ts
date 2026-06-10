import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod.string("Name Must Be Text").nonempty("Name Is Required"),
    email: zod.email("Email isn't in Format").nonempty("Email Is Required"),
    password: zod
      .string("password must be text ")
      .nonempty("password is req")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        `1] Min 1 Special Character 2] Min 1 Number 3] Min 8 Characters or More `,
      ),
    rePassword: zod
      .string("repassword must be text ")
      .nonempty("Confirm Password is not Good")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        `1] Min 1 Special Character 2] Min 1 Number 3] Min 8 Characters or More `,
      ),
    phone: zod
      .string("")
      .nonempty("Phone is Req")
      .regex(/01[0125][0-9]{8}/, "Phone Must Be An Egyption Number"),
  })
  .refine(
    function (value) {
      return value.password === value.rePassword;
    },
    { error: "Passwords are in Match", path: ["password"] },
  );
