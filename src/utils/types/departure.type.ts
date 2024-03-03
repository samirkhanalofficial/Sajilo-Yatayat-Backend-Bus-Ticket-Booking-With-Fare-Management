import { busType } from "./bus.type";

export type createDepartureType = {
  from: string;
  to: string;
  bus: string;
  date: string;
  time: string;
  amount: number;
};
export type departureType = createDepartureType & {
  id: string;
  bus: busType;
  timestamp: Date;
};
