import { userType } from "./user.type";
import { BUSFEATURES } from "../enums/bus-features.enum";
import { BUSTYPE } from "../enums/bus-types.enum";
export type createBusType = {
  images: string[];
  busnumber: string;
  owners: string[];
  yatayat: string;
  bustype: BUSTYPE;
  leftSeats: number;
  rightSeats: number;
  lastSeats: number;
  balance: number;
  features: BUSFEATURES[];
};
export type busType = createBusType & {
  id: string;
  owners: userType[];
  timestamp: Date;
};
