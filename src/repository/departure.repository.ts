import Departure from "../model/departure.model";
import {
  createDepartureType,
  departureType,
} from "../utils/types/departure.type";

class DepartureRepository {
  addDeparture = async (
    departure: createDepartureType
  ): Promise<departureType> => {
    const departureData = new Departure({
      ...departure,
      timestamp: new Date(),
    });
    await departureData.save();
    return this.getDepartureById(departureData.id);
  };
  getDepartureById = async (id: string): Promise<departureType> => {
    const departure = await Departure.findById(id)
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["from", "to"]);
    return departure;
  };
  updateDepartureDetails = async (
    id: string,
    departure: createDepartureType
  ): Promise<departureType> => {
    const updatedDeparture = await Departure.findByIdAndUpdate(id, departure, {
      new: true,
    })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["from", "to"]);
    return updatedDeparture;
  };

  getAllDeparture = async () => {
    const departures = await Departure.find()
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["from", "to"])
      .sort({ timestamp: -1 });
    return departures;
  };
  getDepartureByBusId = async (busId: string) => {
    const departures = await Departure.find()
      .where({
        bus: busId,
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["from", "to"])
      .sort({ timestamp: -1 });
    return departures;
  };
  getDepartures = async (from: string, to: string, date: string) => {
    const departures = await Departure.find()
      .where({
        from,
        to,
        date,
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["from", "to"])
      .sort({ timestamp: -1 });
    return departures;
  };
  deleteDepartureById = async (id: string) => {
    const departure = await Departure.findByIdAndDelete(id)
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["from", "to"]);
    return departure;
  };
}

const departureRepository: DepartureRepository = new DepartureRepository();
export { DepartureRepository, departureRepository };
