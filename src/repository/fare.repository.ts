import { FilterQuery } from "mongoose";
import Fare from "../model/fare.model";
import { FARESTATUS } from "../utils/enums/departure-status.enum";
import { createFareType, fareType } from "../utils/types/fare.type";

class FareRepository {
  constructor() {}

  createFare = async (fareDetails: createFareType): Promise<fareType> => {
    const fare = new Fare(fareDetails);
    await fare.save();
    return fare;
  };
  getFareById = async (id: string): Promise<fareType> => {
    const fare = await Fare.findById(id);
    return fare;
  };
  getBookedSeatByDepartureId = async (
    departureId: string
  ): Promise<number[]> => {
    const acceptedSeats = await Fare.find(
      {
        departure: departureId,
        $or: [{ status: FARESTATUS.ACCEPTED }, { status: FARESTATUS.PAID }],
      },
      { seats: 1, _id: 0 }
    );
    return acceptedSeats[0].seats;
  };

  getFaresByDepartureId = async (departureId: string): Promise<fareType[]> => {
    const fares = await Fare.find({ departure: departureId });
    return fares;
  };
  getUsersFares = async (userId: string): Promise<fareType[]> => {
    const fares = await Fare.find({
      $or: [{ faredBy: userId }],
    });
    return fares;
  };
  getBusFares = async (busId: string): Promise<fareType[]> => {
    const fares = await Fare.find({
      $or: [{ bus: busId }],
    });
    return fares;
  };
  approveFareById = async (id: string): Promise<fareType> => {
    const fare = await this.getFareById(id);
    // reject other fares
    await Fare.updateMany(
      {
        departure: fare.departure,
        $or: [{ seats: { $in: fare.seats } }],
      },
      {
        status: FARESTATUS.REJECTED,
      }
    );
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { status: FARESTATUS.ACCEPTED },
      { new: true }
    );
    return updatedFare;
  };
  rejectFareById = async (id: string): Promise<fareType> => {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { status: FARESTATUS.REJECTED },
      { new: true }
    );
    return updatedFare;
  };
  refundFareById = async (id: string): Promise<fareType> => {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { status: FARESTATUS.REFUNDED },
      { new: true }
    );
    return updatedFare;
  };
  updateFarePriceById = async (
    id: string,
    amount: number,
    isFaredByUser: boolean
  ): Promise<fareType> => {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { status: FARESTATUS.PENDING, amount, isFaredByUser },
      { new: true }
    );
    return updatedFare;
  };
  cancelFareById = async (id: string): Promise<fareType> => {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { status: FARESTATUS.CANCELLED },
      { new: true }
    );
    return updatedFare;
  };
  completeFareById = async (id: string): Promise<fareType> => {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { status: FARESTATUS.COMPLETED },
      { new: true }
    );
    return updatedFare;
  };
  payFareById = async (id: string): Promise<fareType> => {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { status: FARESTATUS.PAID },
      { new: true }
    );
    return updatedFare;
  };
  deleteFareById = async (id: string): Promise<fareType> => {
    const fare = await Fare.findByIdAndDelete(id, { new: false });
    return fare;
  };
}
const fareRepository: FareRepository = new FareRepository();
export { FareRepository, fareRepository };
