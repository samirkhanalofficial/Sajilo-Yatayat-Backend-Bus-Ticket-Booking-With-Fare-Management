import { FARESTATUS } from "../enums/departure-status.enum";
import { departureType } from "./departure.type";
import { userType } from "./user.type";

export type createFareType = {
  seats: number[];
  departure: string;
  faredBy: string;
  faredTo: string;
  amount: number;
  status: FARESTATUS;
};
export type fareType = createFareType & {
  id: string;
  departure: departureType;
  faredBy: userType;
  faredTo: userType;
  timestamp: Date;
};
