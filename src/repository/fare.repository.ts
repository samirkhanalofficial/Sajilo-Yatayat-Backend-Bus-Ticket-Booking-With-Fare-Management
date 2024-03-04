import Fare from "../model/fare.model";
import { FARESTATUS } from "../utils/enums/departure-status.enum";
import { createFareType, fareType } from "../utils/types/fare.type";

class FareRepository {
  constructor() {}

  createFare = async (fareDetails: createFareType): Promise<fareType> => {
    const fare = new Fare(fareDetails);
    await fare.save();
    return this.getFareById(fare.id);
  };
  getFareById = async (id: string): Promise<fareType> => {
    const fare = await Fare.findById(id)
      .populate({
        path: "departure",
        populate: [
          {
            path: "bus",
            populate: {
              path: "owners",
            },
          },
          {
            path: "from",
          },
          {
            path: "to",
          },
        ],
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["faredBy"]);
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

    return acceptedSeats.map((arr) => arr.seats).flat();
  };

  getFaresByDepartureId = async (departureId: string) => {
    const fares = await Fare.find({ departure: departureId })
      .populate({
        path: "departure",
        populate: [
          {
            path: "bus",
            populate: {
              path: "owners",
            },
          },
          {
            path: "from",
          },
          {
            path: "to",
          },
        ],
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["faredBy"])
      .sort({ timestamp: -1 });
    return fares;
  };
  getUsersFares = async (userId: string) => {
    const fares = await Fare.find({
      $or: [{ faredBy: userId }],
    })
      .populate({
        path: "departure",
        populate: [
          {
            path: "bus",
            populate: {
              path: "owners",
            },
          },
          {
            path: "from",
          },
          {
            path: "to",
          },
        ],
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["faredBy"])
      .sort({ timestamp: -1 });
    return fares;
  };
  getBusFares = async (busId: string) => {
    const fares = await Fare.find({
      $or: [{ bus: busId }],
    })
      .populate({
        path: "departure",
        populate: [
          {
            path: "bus",
            populate: {
              path: "owners",
            },
          },
          {
            path: "from",
          },
          {
            path: "to",
          },
        ],
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["faredBy"])
      .sort({ timestamp: -1 });
    return fares;
  };
  approveFareById = async (id: string): Promise<fareType> => {
    const fare = await this.getFareById(id);
    // reject other fares
    await Fare.updateMany(
      {
        departure: fare.departure.id,
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
    )
      .populate({
        path: "departure",
        populate: [
          {
            path: "bus",
            populate: {
              path: "owners",
            },
          },
          {
            path: "from",
          },
          {
            path: "to",
          },
        ],
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["faredBy"]);
    return updatedFare;
  };
  rejectFareById = async (id: string): Promise<fareType> => {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { status: FARESTATUS.REJECTED },
      { new: true }
    )
      .populate({
        path: "departure",
        populate: [
          {
            path: "bus",
            populate: {
              path: "owners",
            },
          },
          {
            path: "from",
          },
          {
            path: "to",
          },
        ],
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["faredBy"]);
    return updatedFare;
  };
  refundFareById = async (id: string): Promise<fareType> => {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { status: FARESTATUS.REFUNDED },
      { new: true }
    )
      .populate({
        path: "departure",
        populate: [
          {
            path: "bus",
            populate: {
              path: "owners",
            },
          },
          {
            path: "from",
          },
          {
            path: "to",
          },
        ],
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["faredBy"]);
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
    )
      .populate({
        path: "departure",
        populate: [
          {
            path: "bus",
            populate: {
              path: "owners",
            },
          },
          {
            path: "from",
          },
          {
            path: "to",
          },
        ],
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["faredBy"]);
    return updatedFare;
  };
  cancelFareById = async (id: string): Promise<fareType> => {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { status: FARESTATUS.CANCELLED },
      { new: true }
    )
      .populate({
        path: "departure",
        populate: [
          {
            path: "bus",
            populate: {
              path: "owners",
            },
          },
          {
            path: "from",
          },
          {
            path: "to",
          },
        ],
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["faredBy"]);
    return updatedFare;
  };
  completeFareById = async (id: string): Promise<fareType> => {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { status: FARESTATUS.COMPLETED },
      { new: true }
    )
      .populate({
        path: "departure",
        populate: [
          {
            path: "bus",
            populate: {
              path: "owners",
            },
          },
          {
            path: "from",
          },
          {
            path: "to",
          },
        ],
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["faredBy"]);
    return updatedFare;
  };
  payFareById = async (id: string): Promise<fareType> => {
    const updatedFare = await Fare.findByIdAndUpdate(
      id,
      { status: FARESTATUS.PAID },
      { new: true }
    )
      .populate({
        path: "departure",
        populate: [
          {
            path: "bus",
            populate: {
              path: "owners",
            },
          },
          {
            path: "from",
          },
          {
            path: "to",
          },
        ],
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["faredBy"]);
    return updatedFare;
  };
  deleteFareById = async (id: string): Promise<fareType> => {
    const fare = await Fare.findByIdAndDelete(id, { new: false })
      .populate({
        path: "departure",
        populate: [
          {
            path: "bus",
            populate: {
              path: "owners",
            },
          },
          {
            path: "from",
          },
          {
            path: "to",
          },
        ],
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["faredBy"]);
    return fare;
  };
}
const fareRepository: FareRepository = new FareRepository();
export { FareRepository, fareRepository };
