import { userType } from "./user.type";

export type createBusType = {
  images: string[];
  busnumber: string;
  owners: string[];
  yatayat: string;
  bustype: BUSTYPE;
  leftSeats: number;
  rightSeats: number;
  lastSeats: number;
  features: BUSFEATURES[];
};
export type busType = createBusType & {
  owners: userType[];
  timestamp: Date;
};
