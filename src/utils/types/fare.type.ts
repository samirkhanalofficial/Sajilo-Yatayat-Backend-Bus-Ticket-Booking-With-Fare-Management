import { FARESTATUS } from "../enums/departure-status.enum";
import { busType } from "./bus.type";
import { departureType } from "./departure.type";
import { userType } from "./user.type";

export type createFareType = {
  seats: number[];
  departure: string;
  faredBy: string;
  isFaredByUser: boolean;
  amount: number;
  bus: string;
  status: FARESTATUS;
};
export type fareType = createFareType & {
  id: string;
  departure: departureType;
  faredBy: userType;
  bus: busType;
  timestamp: Date;
};
