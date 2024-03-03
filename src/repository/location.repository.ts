import Location from "../model/location.model";

class LocationRepository {
  constructor() {}

  addLocation = async (
    locationDetail: createLocationType
  ): Promise<locationType> => {
    const location = new Location(locationDetail);
    await location.save();
    return location;
  };
  getLocationById = async (id: string): Promise<locationType> => {
    const location = await Location.findById(id);
    return location;
  };
  getAllLocations = async (): Promise<locationType[]> => {
    const locations = await Location.find();
    return locations;
  };
  deleteLocationById = async (id: string) => {
    const location = await Location.findByIdAndDelete(id);
    return location;
  };
}
let locationRepository = new LocationRepository();

export { LocationRepository, locationRepository };
