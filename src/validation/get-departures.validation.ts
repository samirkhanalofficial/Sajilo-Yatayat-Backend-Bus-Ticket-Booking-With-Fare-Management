import Joi from "joi";

export const getDeparturesValidation = Joi.object({
  from: Joi.string().required(),
  to: Joi.string().required(),
  date: Joi.date().required(),
});
