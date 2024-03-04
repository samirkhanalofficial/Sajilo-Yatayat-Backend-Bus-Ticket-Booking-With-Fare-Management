import express, { Response } from "express";
import { AuthUserRequest } from "../utils/types/auth-user-request";
import { transactionRepository } from "../repository/transaction.repository";
import Joi from "joi";
import { busRepository } from "../repository/bus.repository";
const transactionRouter = express.Router();

transactionRouter.post(
  "/withdraw/",
  async (req: AuthUserRequest, res: Response) => {
    try {
      const { value, error } = Joi.object({
        busId: Joi.string().required(),
        accountName: Joi.string().required(),
        bankName: Joi.string().required(),
        bankAccountNumber: Joi.string().required(),
      }).validate(req.body);

      if (error) throw error.message;

      const isOwner = await busRepository.isOwnerOfBus(
        value.busId,
        req.user!.id
      );
      if (!isOwner) throw "You dont have permission to do this action";
      const bus = await busRepository.getBusById(value.busId);
      if (bus.balance < 20) throw "Withdraw amount should be atleast 20rs";
      const transaction = await transactionRepository.addTransaction({
        amount: bus.balance,
        isDone: false,
        isIncomming: false,
        isUser: false,
        method: "Bank Transfer",
        who: value.busId,
        accountName: value.accountName,
        bankAccountNumber: value.bankAccountNumber,
        bankName: value.bankName,
      });
      if (!transaction) throw "Error withdrawing";
      await busRepository.decreasebalance(value.busId, bus.balance);
      return res.status(200).json(transaction);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
);
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
