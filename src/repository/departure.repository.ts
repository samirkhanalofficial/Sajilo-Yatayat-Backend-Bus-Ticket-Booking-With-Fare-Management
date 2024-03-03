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
    return departureData;
  };
  getDepartureById = async (id: string): Promise<departureType> => {
    const departure = await Departure.findById(id).populate("bus");
    return departure;
  };
  updateDepartureDetails = async (
    id: string,
    departure: createDepartureType
  ): Promise<departureType> => {
    const updatedDeparture = await Departure.findByIdAndUpdate(id, departure, {
      new: true,
    }).populate("bus");
    return updatedDeparture;
  };

  getAllDeparture = async (): Promise<departureType[]> => {
    const departures: departureType[] = await Departure.find().populate("bus");
    return departures;
  };
  getDepartureByBusId = async (busId: string): Promise<departureType[]> => {
    const departures: departureType[] = await Departure.find()
      .where({
        bus: busId,
      })
      .populate("bus");
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
      .populate("bus");
    return departures;
  };
  deleteDepartureById = async (id: string) => {
    const departure = await Departure.findByIdAndDelete(id);
    return departure;
  };
}

const departureRepository: DepartureRepository = new DepartureRepository();
export { DepartureRepository, departureRepository };
