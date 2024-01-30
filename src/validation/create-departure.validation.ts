import Joi from "joi";
import { createDepartureType } from "../utils/types/departure.type";
const createDepartureValidation = Joi.object<createDepartureType>({
  amount: Joi.number().required(),
  bus: Joi.string().required(),
  date: Joi.string()
    .regex(/^\d{4}\-\d{2}\-\d{2}$/)
    .required(),
  from: Joi.string().required(),
  to: Joi.string().required(),
  time: Joi.string()
    .regex(/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)
    .required(),
});

export { createDepartureValidation };
