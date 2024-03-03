import Joi from "joi";

export const getDeparturesValidation = Joi.object({
  from: Joi.string().required(),
  to: Joi.string().required(),
  date: Joi.string()
    .regex(/^\d{4}\-\d{2}\-\d{2}$/)
    .required(),
});
