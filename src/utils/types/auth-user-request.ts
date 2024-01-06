import { Request } from "express";

export interface AuthUserRequest extends Request {
  user?: any;
}
