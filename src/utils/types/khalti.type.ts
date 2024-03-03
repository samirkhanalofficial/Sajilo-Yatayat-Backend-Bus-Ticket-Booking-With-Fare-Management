import { fareType } from "./fare.type";

export type createKhaltiType = {
  token: string;
  mobile: string;
  fare: string;
  isPaid: boolean;
  amount: number;
};

export type khaltitype = createKhaltiType & {
  fare: fareType;
  id: string;
};
