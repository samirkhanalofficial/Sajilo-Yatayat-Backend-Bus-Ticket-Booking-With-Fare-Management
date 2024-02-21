import Joi from "joi";
import { createFareType } from "../utils/types/fare.type";
const createFareValidation = Joi.object<createFareType>({
  seats: Joi.array().items(Joi.number().required()).required(),
  departure: Joi.string().required(),
  amount: Joi.number().required(),
});

export { createFareValidation };
