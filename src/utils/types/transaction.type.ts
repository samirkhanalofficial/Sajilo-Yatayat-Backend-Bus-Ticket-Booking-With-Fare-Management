export type createTransactionType = {
  amount: number;
  method: string;
  who: string;
  isUser: boolean;
  isIncomming: boolean;
  isDone: boolean;
};

export type transactionType = createTransactionType & {
  id: string;
};
