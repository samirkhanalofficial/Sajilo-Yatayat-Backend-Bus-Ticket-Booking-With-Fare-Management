import Bus from "../model/bus.model";
import { createBusType } from "../utils/types/bus.type";

class BusRepository {
  constructor() {}

  addBus = async (bus: createBusType) => {
    const busData = new Bus(bus);
    await busData.save();
    return busData;
  };

  getBusById = async (id: string) => {
    const bus = await Bus.findById(id);
    return bus;
  };
  addOwnerToBus = async (busId: string, ownerId: string) => {
    const bus = await Bus.findByIdAndUpdate(
      busId,
      {
        $push: { owners: ownerId },
      },
      { new: true }
    );
    return bus;
  };

  removeOwnerFromBus = async (busId: string, ownerId: string) => {
    const bus = await Bus.findByIdAndUpdate(
      busId,
      {
        $pull: { owners: ownerId },
      },
      { new: true }
    );
    return bus;
  };
  getBusByOwner = async (ownerId: string) => {
    const bus = await Bus.findOne({
      $in: { owners: [ownerId] },
    }).getPopulatedPaths();
    return bus;
  };

  getAllBus = async () => {
    const bus = await Bus.find();
    return bus;
  };

  updateBusDetails = async (busId: string, bus: createBusType) => {
    const updatedBus = await Bus.findByIdAndUpdate(busId, bus, {
      new: true,
    });
    return updatedBus;
  };

  deleteBusById = async (busId: string) => {
    const bus = await Bus.findByIdAndDelete(busId);
    return bus;
  };
}
let busRepository = new BusRepository();

export { BusRepository, busRepository };
