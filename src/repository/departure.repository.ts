import Departure from "../model/departure.model";
import {
  createDepartureType,
  departureType,
} from "../utils/types/departure.type";

class DepartureRepository {
  addDeparture = async (
    departure: createDepartureType
  ): Promise<departureType> => {
    const departureData = new Departure(departure);
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

  getAllDeparture = async (): Promise<departureType[]> => {
    const departures: departureType[] = await Departure.find()
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["from", "to"]);
    return departures;
  };
  getDepartureByBusId = async (busId: string): Promise<departureType[]> => {
    const departures: departureType[] = await Departure.find()
      .where({
        bus: busId,
      })
      .populate({
        path: "bus",
        populate: {
          path: "owners",
        },
      })
      .populate(["from", "to"]);
    return departures;
  };
  getDepartures = async (
    from: string,
    to: string,
    date: string
  ): Promise<departureType[]> => {
    const departures: departureType[] = await Departure.find()
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
      .populate(["from", "to"]);
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
