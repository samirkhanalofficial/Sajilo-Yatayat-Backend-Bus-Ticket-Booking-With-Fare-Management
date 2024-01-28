import { Request } from "express";
import { userType } from "./user.type";

export interface AuthUserRequest extends Request {
  user?: userType;
  phone_number?: string;
}
