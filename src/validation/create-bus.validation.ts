import Joi from "joi";
import { createBusType } from "../utils/types/bus.type";
import { BUSTYPE } from "../utils/enums/bus-types.enum";
import { BUSFEATURES } from "../utils/enums/bus-features.enum";
const createBusValidation = Joi.object<createBusType>({
  images: Joi.array().items(Joi.string()).min(1).required(),
  busnumber: Joi.string().required(),
  yatayat: Joi.string().required(),
  bustype: Joi.string()
    .valid(...Object.values(BUSTYPE))
    .required(),
  leftSeats: Joi.number().required(),
  rightSeats: Joi.number().required(),
  lastSeats: Joi.number().required(),
  features: Joi.array()
    .items(Joi.string().valid(...Object.values(BUSFEATURES)))
    .min(1)
    .required(),
});

export { createBusValidation };
