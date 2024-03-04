import express, { Response } from "express";
import { AuthUserRequest } from "../utils/types/auth-user-request";
import { transactionRepository } from "../repository/transaction.repository";
import Joi from "joi";
const transactionRouter = express.Router();

transactionRouter.get(
  "/get-all-transactions/bus/:busId",
  async (req: AuthUserRequest, res: Response) => {
    try {
      const { value, error } = Joi.object({
        busId: Joi.string().required(),
      }).validate({ ...req.params! });
      if (error) throw error.message;
      const transactions = await transactionRepository.getTransactions(
        value.busId,
        false
      );
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
);
transactionRouter.get(
  "/get-all-transactions/user/",
  async (req: AuthUserRequest, res: Response) => {
    try {
      const transactions = await transactionRepository.getTransactions(
        req.user!.id,
        true
      );
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
);
export default transactionRouter;
