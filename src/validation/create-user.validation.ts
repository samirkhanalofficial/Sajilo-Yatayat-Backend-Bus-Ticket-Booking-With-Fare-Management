import Joi from "joi";
import { createUserType } from "../utils/types/user.type";

export const createUserValidation = Joi.object<createUserType>({
  name: Joi.string().min(3).max(200).required(),
  gender: Joi.string().valid("male", "female").required(),
  address: Joi.string().min(10).max(200).required(),
  dob: Joi.date().required(),
});
