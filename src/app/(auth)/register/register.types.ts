import * as zod from "zod";
import { registerSchema } from "./register.Schemas";

export type RegisterObjectType = zod.infer<typeof registerSchema>;
