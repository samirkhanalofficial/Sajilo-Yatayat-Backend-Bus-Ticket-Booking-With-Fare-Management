import Transaction from "../model/transaction.model";
import { createTransactionType } from "../utils/types/transaction.type";

class TransactionRepository {
  constructor() {}

  addTransaction = async (dataToSave: createTransactionType) => {
    const transactionData = new Transaction(dataToSave);
    await transactionData.save();
    return transactionData;
  };
  getTransactions = async (userId: string, isUser: boolean) => {
    const transactions = Transaction.find({
      who: userId,
      isUser,
    });

    return transactions;
  };
}
const transactionRepository: TransactionRepository =
  new TransactionRepository();
export { TransactionRepository, transactionRepository };
