import Bus from "../model/bus.model";
import { busType, createBusType } from "../utils/types/bus.type";

class BusRepository {
  constructor() {}

  addBus = async (bus: createBusType): Promise<busType> => {
    const busData = new Bus(bus);
    await busData.save();
    return this.getBusById(busData._id);
  };

  getBusById = async (id: string): Promise<busType> => {
    const bus = await Bus.findById(id).populate("owners");
    return bus;
  };
  addOwnerToBus = async (busId: string, ownerId: string): Promise<busType> => {
    const bus = await Bus.findByIdAndUpdate(
      busId,
      {
        owners: { $push: ownerId },
      },
      { new: true }
    ).populate("owners");
    return bus;
  };

  removeOwnerFromBus = async (
    busId: string,
    ownerId: string
  ): Promise<busType> => {
    const bus = await Bus.findByIdAndUpdate(
      busId,
      {
        owners: { $pull: ownerId },
      },
      { new: true }
    ).populate("owners");
    return bus;
  };
  getBussesByOwner = async (ownerId: string): Promise<busType[]> => {
    const busses: busType[] = await Bus.find()
      .where({
        owners: { $in: [ownerId] },
      })
      .populate("owners");
    return busses;
  };
  isOwnerOfBus = async (busId: string, ownerId: string): Promise<boolean> => {
    const bus = await Bus.find({
      _id: busId,
      owners: { $in: [ownerId] },
    }).populate("owners");
    return bus.length > 0;
  };

  getAllBus = async (): Promise<busType[]> => {
    const bus: busType[] = await Bus.find().populate("owners");
    return bus;
  };

  updateBusDetails = async (
    busId: string,
    bus: createBusType
  ): Promise<busType> => {
    const updatedBus = await Bus.findByIdAndUpdate(busId, bus, {
      new: true,
    }).populate("owners");
    return updatedBus;
  };
  increasebalance = async (busId: string, amount: number) => {
    const bus = await Bus.findByIdAndUpdate(
      busId,
      {
        $inc: {
          balance: amount,
        },
      },
      {
        new: true,
      }
    );
    return bus;
  };
  decreasebalance = async (busId: string, amount: number) => {
    const bus = await Bus.findByIdAndUpdate(
      busId,
      {
        $inc: {
          balance: -amount,
        },
      },
      {
        new: true,
      }
    );
    return bus;
  };
  deleteBusById = async (busId: string) => {
    const bus = await Bus.findByIdAndDelete(busId).populate("owners");
    return bus;
  };
}
let busRepository = new BusRepository();

export { BusRepository, busRepository };
