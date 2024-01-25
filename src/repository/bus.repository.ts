import Bus from "../model/bus.model";
import { createBusType } from "../utils/types/bus.type";

class BusRepository {
  constructor() {}

  addBus = async (bus: createBusType) => {
    const adminData = new Bus(bus);
    await adminData.save();
    return adminData;
  };
  getBusById = async (id: string) => {
    const bus = await Bus.findById(id);
    return bus;
  };
  getBusByOwner = async (ownerId: string) => {
    const bus = await Bus.findOne({ $in: { owners: [ownerId] } });
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
