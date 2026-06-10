import * as zod from "zod";
import { loginSchema } from "./login.Schemas";
export type LoginObjectType = zod.infer<typeof loginSchema>;
