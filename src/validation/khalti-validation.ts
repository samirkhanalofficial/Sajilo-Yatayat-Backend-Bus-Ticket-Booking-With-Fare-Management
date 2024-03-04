import Joi from "joi";

export const KhaltiValidation = Joi.object({
  fare: Joi.string().required(),
  mobile: Joi.string().required().max(10),
  transaction_pin: Joi.number().required(),
});

export const VerifyKhaltiPayment = Joi.object({
  token: Joi.string().required(),
  transaction_pin: Joi.number().required(),
  confirmation_code: Joi.number().required(),
});
