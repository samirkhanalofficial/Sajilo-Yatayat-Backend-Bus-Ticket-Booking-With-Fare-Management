import Bus from "../model/bus.model";
import { busType, createBusType } from "../utils/types/bus.type";

class BusRepository {
  constructor() {}

  addBus = async (bus: createBusType): Promise<busType> => {
    const busData = new Bus(bus);
    await busData.save();
    return busData;
  };

  getBusById = async (id: string): Promise<busType> => {
    const bus = await Bus.findById(id).populate("owners");
    return bus;
  };
  addOwnerToBus = async (busId: string, ownerId: string): Promise<busType> => {
    const bus = await Bus.findByIdAndUpdate(
      busId,
      {
        $push: { owners: ownerId },
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
        $pull: { owners: ownerId },
      },
      { new: true }
    ).populate("owners");
    return bus;
  };
  getBusByOwner = async (ownerId: string): Promise<busType> => {
    const bus = await Bus.findOne({
      $in: { owners: [ownerId] },
    }).populate("owners");
    return bus;
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

  deleteBusById = async (busId: string) => {
    const bus = await Bus.findByIdAndDelete(busId);
    return bus;
  };
}
let busRepository = new BusRepository();

export { BusRepository, busRepository };
