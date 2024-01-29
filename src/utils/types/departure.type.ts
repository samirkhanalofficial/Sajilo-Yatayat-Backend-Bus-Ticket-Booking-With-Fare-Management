import { busType } from "./bus.type";

export type createDepartureType = {
  from: string;
  to: string;
  bus: string;
  date: Date;
  time: string;
  amount: number;
};
export type departureType = createDepartureType & {
  bus: busType;
  timestamp: Date;
};
