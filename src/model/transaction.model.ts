import mongoose from "mongoose";
import { transactionType } from "../utils/types/transaction.type";

const transactionSchema = new mongoose.Schema<transactionType>({
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  who: { type: String, required: true },
  isUser: { type: Boolean, default: false },
  isIncomming: { type: Boolean, default: false },
  isDone: { type: Boolean, default: false },
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
export default Transaction;
